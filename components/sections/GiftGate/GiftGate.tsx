"use client";

import { useEffect, useRef, useState, type CSSProperties, type JSX } from "react";
import { Cake, Gift, Heart, PartyPopper, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { NO_SOUNDS, YES_SOUND } from "@/lib/constants";
import {
	CONFETTI_DURATION,
	HERO_FADE_DURATION,
	LOCAL_STORAGE_MUTED_KEY,
	WRONG_ANSWER_DURATION,
	getConfettiPieces,
	getCountdownToUnlock,
	getHeroCopy,
} from "@/lib/birthday";
import { GiftBox } from "@/components/sections/GiftGate/GiftBox";
import { BirthdayCountdown } from "@/components/sections/GiftGate/BirthdayCountdown";

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
 * Birthday hero: a closed gift until September 18, then unwrap.
 */
export function GiftGate({ opened, onOpen, onShakeChange }: GiftGateProps): JSX.Element {
	const [isVisible, setIsVisible] = useState(false);
	const [showLockedHint, setShowLockedHint] = useState(false);
	const [wiggling, setWiggling] = useState(false);
	const [muted, setMuted] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);
	const [now, setNow] = useState<Date>(() => new Date());
	const nopeAudioRefs = useRef<HTMLAudioElement[]>([]);
	const yayAudioRef = useRef<HTMLAudioElement | null>(null);
	const noSoundIndexRef = useRef(0);

	const heroCopy: HeroCopy = getHeroCopy(now);
	const countdown = getCountdownToUnlock(now);

	useEffect(() => {
		setIsVisible(true);
		setNow(new Date());
		const intervalId = window.setInterval(() => {
			setNow(new Date());
		}, 1000);
		return () => {
			window.clearInterval(intervalId);
		};
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

	const handleLockedTap = (): void => {
		setShowLockedHint(true);
		setWiggling(true);
		onShakeChange(true);
		playNope();
		triggerHapticFeedback("error");
		setTimeout(() => {
			setShowLockedHint(false);
			setWiggling(false);
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

	const handleGiftActivate = (): void => {
		if (opened) return;
		if (!heroCopy.canOpen) {
			handleLockedTap();
			return;
		}
		handleGiftOpen();
	};

	return (
		<>
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

			<section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden z-[60]">
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
						"relative z-10 text-center space-y-10 transition-all w-full max-w-xl mx-auto",
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
					)}
					style={{ transitionDuration: `${HERO_FADE_DURATION}ms` }}
				>
					<div className="space-y-6 px-2">
						<h1
							className="font-script text-6xl sm:text-7xl md:text-8xl leading-[1.2] text-balance text-pink-600"
							suppressHydrationWarning
						>
							{heroCopy.title}
						</h1>
						{!heroCopy.canOpen && <BirthdayCountdown parts={countdown} />}
						{heroCopy.canOpen && heroCopy.subtitle && (
							<p className="font-sans text-base sm:text-lg tracking-wide text-pink-900/50">
								{heroCopy.subtitle}
							</p>
						)}
					</div>

					<div className="flex flex-col items-center">
						<GiftBox
							opened={opened}
							locked={!heroCopy.canOpen}
							wiggling={wiggling}
							ariaLabel={heroCopy.giftAriaLabel}
							onActivate={handleGiftActivate}
						/>
						<div className="min-h-8 mt-2 flex items-center justify-center">
							{opened && (
								<p className="font-script text-2xl text-pink-600">{heroCopy.successMessage}</p>
							)}
							{!opened && showLockedHint && heroCopy.lockedHint && (
								<p className="font-sans text-sm text-pink-800/70">{heroCopy.lockedHint}</p>
							)}
							{!opened && !showLockedHint && !heroCopy.canOpen && (
								<p className="font-sans text-sm text-pink-800/40">Opens September 18</p>
							)}
							{!opened && !showLockedHint && heroCopy.canOpen && (
								<p className="font-sans text-sm text-pink-800/40">Tap to open</p>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
