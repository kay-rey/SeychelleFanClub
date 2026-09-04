"use client";

import { useEffect, useRef, useState, type CSSProperties, type JSX } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { COVER_IMAGE, NO_SOUNDS, YES_SOUND } from "@/lib/constants";
import {
	CONFETTI_DURATION,
	HERO_FADE_DURATION,
	LOCAL_STORAGE_MUTED_KEY,
	WRONG_ANSWER_DURATION,
	getConfettiPieces,
	getCountdownToUnlock,
	getHeroCopy,
} from "@/lib/birthday";
import { BirthdayCountdown } from "@/components/sections/GiftGate/BirthdayCountdown";

import type { HeroCopy } from "@/lib/types";

const SOFT_MARKS = getConfettiPieces();

interface GiftGateProps {
	opened: boolean;
	onOpen: () => void;
	onShakeChange: (isShaking: boolean) => void;
}

/**
 * Photography-first editorial cover. Locked until September 18 Pacific midnight.
 */
export function GiftGate({ opened, onOpen, onShakeChange }: GiftGateProps): JSX.Element {
	const [isVisible, setIsVisible] = useState(false);
	const [showLockedHint, setShowLockedHint] = useState(false);
	const [muted, setMuted] = useState(false);
	const [showMarks, setShowMarks] = useState(false);
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
		onShakeChange(true);
		playNope();
		triggerHapticFeedback("error");
		setTimeout(() => {
			setShowLockedHint(false);
			onShakeChange(false);
		}, WRONG_ANSWER_DURATION);
	};

	const handleOpen = (): void => {
		if (opened) return;
		setShowMarks(true);
		playYay();
		onOpen();
		triggerHapticFeedback("success");
		setTimeout(() => setShowMarks(false), CONFETTI_DURATION);
	};

	const handleActivate = (): void => {
		if (opened) return;
		if (!heroCopy.canOpen) {
			handleLockedTap();
			return;
		}
		handleOpen();
	};

	return (
		<>
			{showMarks && (
				<div
					className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center"
					aria-hidden
				>
					{SOFT_MARKS.map(({ id, tx, ty }) => (
						<div
							key={`mark-${id}`}
							className="soft-mark absolute"
							style={
								{
									"--tx": `${tx}px`,
									"--ty": `${ty}px`,
								} as CSSProperties
							}
						/>
					))}
				</div>
			)}

			<section className="relative min-h-screen z-[60] overflow-hidden">
				<div className="absolute inset-0">
					<Image
						src={COVER_IMAGE.src}
						alt={COVER_IMAGE.alt}
						fill
						priority
						placeholder="blur"
						sizes="100vw"
						className="object-cover cover-image-motion"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#2c2418]/75 via-[#2c2418]/35 to-[#2c2418]/20" />
				</div>

				<button
					type="button"
					onClick={toggleMuted}
					className="absolute top-4 right-4 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-[#f5f0e8]/85 backdrop-blur-sm border border-white/30 text-primary hover:bg-[#f5f0e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
					aria-label={muted ? "Unmute sounds" : "Mute sounds"}
				>
					{muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
				</button>

				<div
					className={cn(
						"relative z-10 min-h-screen flex flex-col items-center justify-end sm:justify-center px-6 pb-16 sm:pb-0 pt-24",
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
					)}
					style={{ transitionDuration: `${HERO_FADE_DURATION}ms`, transitionProperty: "opacity, transform" }}
				>
					<div className="w-full max-w-3xl mx-auto text-center space-y-8 editorial-fade-up">
						<p className="font-sans text-[0.7rem] sm:text-xs uppercase tracking-[0.28em] text-[#f5f0e8]/70">
							September 18
						</p>
						<h1
							className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] text-balance text-[#f5f0e8]"
							suppressHydrationWarning
						>
							{heroCopy.title}
						</h1>

						{!heroCopy.canOpen && <BirthdayCountdown parts={countdown} />}

						{heroCopy.canOpen && heroCopy.subtitle && (
							<p className="font-serif italic text-lg sm:text-xl text-[#f5f0e8]/80">
								{heroCopy.subtitle}
							</p>
						)}

						<div className="pt-2 space-y-3">
							{!opened && (
								<button
									type="button"
									onClick={handleActivate}
									aria-label={heroCopy.openAriaLabel}
									className={cn(
										"inline-flex items-center justify-center min-h-11 px-10 py-3",
										"border border-[#f5f0e8]/55 bg-[#f5f0e8]/10 text-[#f5f0e8]",
										"font-sans text-xs uppercase tracking-[0.22em]",
										"backdrop-blur-sm transition-colors duration-300",
										"hover:bg-[#f5f0e8]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
									)}
								>
									{heroCopy.canOpen ? "Open" : "Not yet"}
								</button>
							)}

							<div className="min-h-8 flex items-center justify-center">
								{opened && (
									<p className="font-serif italic text-xl text-[#f5f0e8]">
										{heroCopy.successMessage}
									</p>
								)}
								{!opened && showLockedHint && heroCopy.lockedHint && (
									<p className="font-sans text-sm text-[#f5f0e8]/80">{heroCopy.lockedHint}</p>
								)}
								{!opened && !showLockedHint && !heroCopy.canOpen && (
									<p className="font-sans text-sm text-[#f5f0e8]/50">Opens September 18</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
