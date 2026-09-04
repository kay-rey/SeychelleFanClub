"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type JSX } from "react";
import { Cake, Gift, Heart, PartyPopper, Shell, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NO_SOUNDS, YES_SOUND } from "@/lib/constants";
import {
	CONFETTI_DURATION,
	FLOATING_GIFT_COUNT,
	FLOATING_HEART_COUNT,
	FLOATING_SHELL_COUNT,
	HERO_FADE_DURATION,
	LOCAL_STORAGE_MUTED_KEY,
	MAX_NOT_YET_CLICKS,
	NOT_YET_POSITIONS,
	NOT_YET_SIZE_STEPS,
	SPARKLE_COUNT,
	WRONG_ANSWER_DURATION,
	getConfettiPieces,
	getHeroCopy,
} from "@/lib/birthday";
import { GiftBox } from "@/components/sections/GiftGate/GiftBox";

import type { HeroCopy } from "@/lib/types";

const CONFETTI_PIECES = getConfettiPieces();

const CONFETTI_ICONS = [Heart, Cake, Gift, PartyPopper] as const;

const CONFETTI_ICON_CLASS = [
	"w-8 h-8 text-pink-400 fill-pink-400",
	"w-8 h-8 text-amber-400",
	"w-8 h-8 text-pink-500",
	"w-8 h-8 text-yellow-500",
] as const;

interface GiftGateProps {
	opened: boolean;
	onOpen: () => void;
	onShakeChange: (isShaking: boolean) => void;
}

/**
 * Birthday hero: date-aware copy, tap-to-open gift, and a Not yet button that runs away.
 */
export function GiftGate({ opened, onOpen, onShakeChange }: GiftGateProps): JSX.Element {
	const [isVisible, setIsVisible] = useState(false);
	const [showWrongAnswer, setShowWrongAnswer] = useState(false);
	const [notYetIndex, setNotYetIndex] = useState(0);
	const [notYetClickCount, setNotYetClickCount] = useState(0);
	const [muted, setMuted] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);
	const [heroCopy, setHeroCopy] = useState<HeroCopy>(() => getHeroCopy(new Date()));
	const nopeAudioRefs = useRef<HTMLAudioElement[]>([]);
	const yayAudioRef = useRef<HTMLAudioElement | null>(null);
	const noSoundIndexRef = useRef(0);

	const sparkleStyles = useMemo(
		() =>
			Array.from({ length: SPARKLE_COUNT }, () => ({
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				animationDelay: `${Math.random() * 2}s`,
			})),
		[]
	);

	useEffect(() => {
		setIsVisible(true);
		setHeroCopy(getHeroCopy(new Date()));
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const stored = localStorage.getItem(LOCAL_STORAGE_MUTED_KEY);
		if (stored === "true") setMuted(true);
	}, []);

	useEffect(() => {
		nopeAudioRefs.current = NO_SOUNDS.map((src) => {
			const audio = new Audio(src);
			audio.preload = "auto";
			audio.load();
			return audio;
		});

		const yayAudio = new Audio(YES_SOUND);
		yayAudio.preload = "auto";
		yayAudio.load();
		yayAudioRef.current = yayAudio;

		return () => {
			nopeAudioRefs.current = [];
			yayAudioRef.current = null;
		};
	}, []);

	const playNope = (): void => {
		if (muted) return;
		try {
			const index = noSoundIndexRef.current % NO_SOUNDS.length;
			const audio = nopeAudioRefs.current[index];
			if (audio) {
				audio.currentTime = 0;
				audio.play().catch(() => {});
			}
			noSoundIndexRef.current += 1;
		} catch {
			// ignore when files are missing
		}
	};

	const playYay = (): void => {
		if (muted) return;
		try {
			const audio = yayAudioRef.current;
			if (audio) {
				audio.currentTime = 0;
				audio.play().catch(() => {});
			}
		} catch {
			// ignore when files are missing
		}
	};

	const triggerHapticFeedback = (type: "success" | "error"): void => {
		if (typeof window === "undefined" || !navigator.vibrate) return;
		try {
			if (type === "success") {
				navigator.vibrate(50);
			} else {
				navigator.vibrate([30, 50, 30]);
			}
		} catch {
			// Silently fail if vibration is not supported or blocked
		}
	};

	const toggleMuted = (): void => {
		setMuted((m: boolean) => {
			const next = !m;
			localStorage.setItem(LOCAL_STORAGE_MUTED_KEY, String(next));
			return next;
		});
	};

	const handleNotYetClick = (): void => {
		setNotYetIndex((i: number) => (i + 1) % NOT_YET_POSITIONS.length);
		setNotYetClickCount((c: number) => Math.min(c + 1, MAX_NOT_YET_CLICKS));
		setShowWrongAnswer(true);
		onShakeChange(true);
		playNope();
		triggerHapticFeedback("error");
		setTimeout(() => {
			setShowWrongAnswer(false);
			onShakeChange(false);
		}, WRONG_ANSWER_DURATION);
	};

	const handleGiftOpen = (): void => {
		if (opened) return;
		setShowConfetti(true);
		playYay();
		onOpen();
		triggerHapticFeedback("success");
		setTimeout(() => setShowConfetti(false), CONFETTI_DURATION);
	};

	const notYetStep = NOT_YET_SIZE_STEPS[Math.min(notYetClickCount, MAX_NOT_YET_CLICKS)];
	const notYetPosition = NOT_YET_POSITIONS[notYetIndex];

	return (
		<>
			{showWrongAnswer && (
				<div className="fixed inset-0 z-[70] bg-red-500/40 pointer-events-none" aria-hidden />
			)}

			{showConfetti && (
				<div
					className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center"
					aria-hidden
				>
					{CONFETTI_PIECES.map(({ id, tx, ty }) => {
						const Icon = CONFETTI_ICONS[id % CONFETTI_ICONS.length];
						const iconClass = CONFETTI_ICON_CLASS[id % CONFETTI_ICON_CLASS.length];
						return (
							<div
								key={`confetti-${id}`}
								className="confetti-piece absolute"
								style={
									{
										"--tx": `${tx}px`,
										"--ty": `${ty}px`,
									} as CSSProperties
								}
							>
								<Icon className={iconClass} />
							</div>
						);
					})}
				</div>
			)}

			<div className="fixed inset-0 z-0">
				<div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-amber-50/40 to-rose-50" />
				<div className="absolute inset-0 bg-gradient-to-tr from-pink-100/20 via-transparent to-yellow-100/20" />
				<div className="absolute inset-0 bg-gradient-to-bl from-yellow-100/20 via-transparent to-pink-100/15" />
				<div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-pink-200/10 via-transparent to-transparent" />
				<div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-amber-200/10 via-transparent to-transparent" />
			</div>

			{isVisible && (
				<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
					{sparkleStyles.map((style, i) => (
						<div key={i} className="absolute sparkle" style={style}>
							<Sparkles className="w-4 h-4 text-pink-300" />
						</div>
					))}
				</div>
			)}

			{isVisible && (
				<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
					{Array.from({ length: FLOATING_HEART_COUNT }, (_, i) => i + 1).map((n) => (
						<div key={`heart-${n}`} className={`floating-heart-${n}`}>
							<Heart className="w-4 h-4 text-pink-300/60" />
						</div>
					))}
					{Array.from({ length: FLOATING_SHELL_COUNT }, (_, i) => i + 1).map((n) => (
						<div key={`shell-${n}`} className={`floating-shell-${n}`}>
							<Shell className="w-5 h-5 text-yellow-300/40" />
						</div>
					))}
					{Array.from({ length: FLOATING_GIFT_COUNT }, (_, i) => i + 1).map((n) => (
						<div key={`gift-${n}`} className={`floating-gift-${n}`}>
							<Gift className="w-5 h-5 text-pink-300/50" />
						</div>
					))}
				</div>
			)}

			<section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden z-[60]">
				<div className="absolute inset-0 bg-gradient-to-b from-pink-200/40 via-amber-100/20 to-transparent" />
				<div className="absolute inset-0 bg-gradient-to-b from-rose-200/20 via-yellow-100/10 to-transparent" />
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute -top-32 -left-32 w-80 h-80 bg-gradient-to-br from-pink-300/50 to-amber-200/40 rounded-full blur-3xl" />
					<div className="absolute -top-32 -right-32 w-72 h-72 bg-gradient-to-br from-yellow-200/40 to-pink-300/50 rounded-full blur-3xl" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-200/60 to-amber-100/50 rounded-full blur-3xl" />
					<div className="absolute top-1/3 left-1/4 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl" />
					<div className="absolute top-2/3 right-1/4 w-28 h-28 bg-yellow-200/30 rounded-full blur-2xl" />
				</div>

				<button
					type="button"
					onClick={toggleMuted}
					className="absolute top-4 right-4 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200/50 text-pink-600 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
					aria-label={muted ? "Unmute sounds" : "Mute sounds"}
				>
					{muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
				</button>

				<div
					className={cn(
						"relative z-10 text-center space-y-8 transition-all w-full max-w-2xl mx-auto",
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
					)}
					style={{ transitionDuration: `${HERO_FADE_DURATION}ms` }}
				>
					<div className="relative px-2">
						<div className="absolute -inset-8 bg-gradient-to-r from-pink-200/30 via-amber-100/20 to-pink-200/30 rounded-3xl blur-2xl" />
						<div className="relative flex flex-col items-center gap-3">
							<div className="flex items-center justify-center gap-2">
								<Heart
									className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 fill-pink-400/80 float"
									style={{ animationDelay: "0s" }}
								/>
								<Gift className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400/80 float" style={{ animationDelay: "0.3s" }} />
								<Heart
									className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 fill-pink-400/80 float"
									style={{ animationDelay: "0.6s" }}
								/>
							</div>
							<h1
								className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-balance drop-shadow-[0_2px_8px_rgba(236,72,153,0.2)]"
								suppressHydrationWarning
							>
								<span className="block bg-gradient-to-r from-pink-600 via-pink-500 to-amber-500 bg-clip-text text-transparent [text-shadow:0_0_40px_rgba(236,72,153,0.15)]">
									{heroCopy.title}
								</span>
							</h1>
							{heroCopy.subtitle && (
								<p className="font-serif text-lg sm:text-xl text-pink-600/80" suppressHydrationWarning>
									{heroCopy.subtitle}
								</p>
							)}
							<div className="flex items-center justify-center gap-2">
								<Cake className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400/80 float" style={{ animationDelay: "0.2s" }} />
								<Heart
									className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400/70 fill-yellow-400/50 float"
									style={{ animationDelay: "0.5s" }}
								/>
								<PartyPopper
									className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 float"
									style={{ animationDelay: "0.8s" }}
								/>
							</div>
						</div>
					</div>

					<div className="min-h-10 flex items-center justify-center">
						{showWrongAnswer && (
							<p className="text-lg font-semibold text-red-600 animate-pulse">
								Wrong answer! Open the gift.
							</p>
						)}
					</div>

					<div className="flex flex-row items-end justify-center gap-4 sm:gap-8">
						<GiftBox opened={opened} ariaLabel={heroCopy.giftAriaLabel} onOpen={handleGiftOpen} />
						{!opened && (
							<div className="relative h-11 min-w-[5.5rem]">
								<Button
									type="button"
									variant="outline"
									onClick={handleNotYetClick}
									className={cn(
										"absolute top-0 left-0 font-serif rounded-lg transition-all duration-300 ease-out",
										notYetStep
									)}
									style={{
										transform: `translate(${notYetPosition.x}px, ${notYetPosition.y}px)`,
									}}
								>
									Not yet
								</Button>
							</div>
						)}
					</div>

					<div className="min-h-[2.5rem] flex items-center justify-center">
						{opened && (
							<p className="font-serif text-xl text-pink-600">{heroCopy.successMessage}</p>
						)}
					</div>
				</div>
			</section>
		</>
	);
}
