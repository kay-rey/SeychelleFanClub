"use client";

import { useEffect, useRef, useState, type CSSProperties, type JSX } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { BIRTHDAY_SONG, COVER_IMAGE, NO_SOUNDS } from "@/lib/constants";
import {
	CONFETTI_DURATION,
	HERO_FADE_DURATION,
	LOCAL_STORAGE_MUTED_KEY,
	TEST_UNLOCK_AT_NEXT_MINUTE,
	TEST_UNLOCK_AT_NEXT_MIDNIGHT,
	UNLOCK_FANFARE_DURATION,
	UNLOCK_MOMENT_DURATION,
	WRONG_ANSWER_DURATION,
	getConfettiPieces,
	getCountdownToUnlock,
	getHeroCopy,
	getUnlockFanfarePieces,
} from "@/lib/birthday";
import { BirthdayCountdown } from "@/components/sections/GiftGate/BirthdayCountdown";

import type { HeroCopy } from "@/lib/types";

const SOFT_MARKS = getConfettiPieces();
const UNLOCK_MARKS = getUnlockFanfarePieces();

interface GiftGateProps {
	opened: boolean;
	onOpen: () => void;
	onShakeChange: (isShaking: boolean) => void;
}

/**
 * Photography-first editorial cover.
 *
 * One in-flow section. Height is locked to a pixel value after mount so mobile
 * browser chrome show/hide cannot resize the hero while scrolling.
 */
export function GiftGate({ opened, onOpen, onShakeChange }: GiftGateProps): JSX.Element {
	const [isVisible, setIsVisible] = useState(false);
	const [showLockedHint, setShowLockedHint] = useState(false);
	const [muted, setMuted] = useState(false);
	const [showMarks, setShowMarks] = useState(false);
	const [showUnlockFanfare, setShowUnlockFanfare] = useState(false);
	const [justUnlocked, setJustUnlocked] = useState(false);
	const [now, setNow] = useState<Date>(() => new Date());
	const nopeAudioRefs = useRef<HTMLAudioElement[]>([]);
	const birthdaySongRef = useRef<HTMLAudioElement | null>(null);
	const songStartedRef = useRef(false);
	const noSoundIndexRef = useRef(0);
	const prevCanOpenRef = useRef<boolean | null>(null);
	const lastViewportWidthRef = useRef(0);

	const heroCopy: HeroCopy = getHeroCopy(now);
	const countdown = getCountdownToUnlock(now);

	useEffect(() => {
		const lockCoverHeight = (): void => {
			document.documentElement.style.setProperty(
				"--gift-cover-height",
				`${window.innerHeight}px`
			);
		};

		lockCoverHeight();
		lastViewportWidthRef.current = window.innerWidth;

		const onOrientationChange = (): void => {
			window.setTimeout(() => {
				lastViewportWidthRef.current = window.innerWidth;
				lockCoverHeight();
			}, 200);
		};

		const onResize = (): void => {
			// Ignore toolbar show/hide (height-only). Relock on real layout width changes.
			if (window.innerWidth === lastViewportWidthRef.current) return;
			lastViewportWidthRef.current = window.innerWidth;
			lockCoverHeight();
		};

		window.addEventListener("orientationchange", onOrientationChange);
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("orientationchange", onOrientationChange);
			window.removeEventListener("resize", onResize);
		};
	}, []);

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

		const birthdaySong = new Audio(BIRTHDAY_SONG);
		birthdaySong.preload = "auto";
		birthdaySong.loop = false;
		birthdaySong.load();
		birthdaySongRef.current = birthdaySong;

		return () => {
			nopeAudioRefs.current = [];
			birthdaySong.pause();
			birthdaySongRef.current = null;
		};
	}, []);

	useEffect(() => {
		const song = birthdaySongRef.current;
		if (!song) return;
		song.muted = muted;
		if (muted) {
			song.pause();
		} else if (songStartedRef.current) {
			song.play().catch(() => {});
		}
	}, [muted]);

	const triggerHapticFeedback = (type: "success" | "error" | "fanfare"): void => {
		if (typeof window === "undefined" || !navigator.vibrate) return;
		try {
			if (type === "fanfare") {
				navigator.vibrate([40, 50, 40, 50, 40, 80, 160]);
			} else if (type === "success") {
				navigator.vibrate([40, 30, 60]);
			} else {
				navigator.vibrate([30, 50, 30]);
			}
		} catch {
			// Silently fail if vibration is not supported or blocked
		}
	};

	useEffect(() => {
		const canOpen = heroCopy.canOpen;
		const previous = prevCanOpenRef.current;
		prevCanOpenRef.current = canOpen;

		if (previous !== false || canOpen !== true || opened) {
			return;
		}

		setJustUnlocked(true);
		setShowLockedHint(false);
		setShowUnlockFanfare(true);
		triggerHapticFeedback("fanfare");

		const fanfareTimeout = window.setTimeout(() => {
			setShowUnlockFanfare(false);
		}, UNLOCK_FANFARE_DURATION);
		const unlockTimeout = window.setTimeout(() => {
			setJustUnlocked(false);
		}, UNLOCK_MOMENT_DURATION);

		return () => {
			window.clearTimeout(fanfareTimeout);
			window.clearTimeout(unlockTimeout);
		};
	}, [heroCopy.canOpen, opened]);

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

	const playBirthdaySong = (): void => {
		songStartedRef.current = true;
		const song = birthdaySongRef.current;
		if (!song || muted) return;
		try {
			song.currentTime = 0;
			song.muted = false;
			song.play().catch(() => {});
		} catch {
			// ignore when playback is blocked
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
		playBirthdaySong();
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
					className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center"
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

			<section className="gift-cover z-10">
				<div className="gift-cover-media">
					<Image
						src={COVER_IMAGE.src}
						alt={COVER_IMAGE.alt}
						fill
						priority
						placeholder="blur"
						sizes="100vw"
						className="object-cover object-center"
					/>
					<div
						className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(28,24,18,0.92)_0%,rgba(28,24,18,0.88)_24%,rgba(28,24,18,0.55)_34%,rgba(28,24,18,0.12)_44%,transparent_54%)]"
						aria-hidden
					/>
				</div>

				{showUnlockFanfare && (
					<div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden" aria-hidden>
						<div className="unlock-veil" />
						<div className="unlock-ring" />
						<div className="absolute inset-0 flex items-center justify-center">
							{UNLOCK_MARKS.map(({ id, tx, ty, size = 8, delayMs = 0, tone = "gold" }) => (
								<div
									key={`unlock-mark-${id}`}
									className={cn("unlock-mark", `unlock-mark-tone-${tone}`)}
									style={
										{
											width: size,
											height: size,
											animationDelay: `${delayMs}ms`,
											"--tx": `${tx}px`,
											"--ty": `${ty}px`,
											"--spin": `${(id % 2 === 0 ? 1 : -1) * (90 + (id % 5) * 28)}deg`,
										} as CSSProperties
									}
								/>
							))}
						</div>
					</div>
				)}

				<button
					type="button"
					onClick={toggleMuted}
					className="absolute top-4 right-4 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-[#f5f0e8]/85 backdrop-blur-sm border border-white/30 text-primary hover:bg-[#f5f0e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
					aria-label={muted ? "Unmute sounds" : "Mute sounds"}
				>
					{muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
				</button>

				<div
					className={cn(
						"gift-cover-ui transition-opacity",
						isVisible ? "opacity-100" : "opacity-0"
					)}
					style={{ transitionDuration: `${HERO_FADE_DURATION}ms` }}
				>
					<div className="w-full max-w-3xl mx-auto text-center space-y-5 sm:space-y-6 editorial-fade-up">
						{justUnlocked ? (
							<p className="font-sans text-[0.7rem] sm:text-xs uppercase tracking-[0.28em] text-[#f5f0e8] unlock-banner">
								It&apos;s time
							</p>
						) : (
							<p className="font-sans text-[0.7rem] sm:text-xs uppercase tracking-[0.28em] text-[#f5f0e8]/90">
								{TEST_UNLOCK_AT_NEXT_MINUTE
									? "This minute"
									: TEST_UNLOCK_AT_NEXT_MIDNIGHT
										? "Tonight"
										: "September 18"}
							</p>
						)}
						<h1
							key={heroCopy.title}
							className={cn(
								"font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.35] py-1 text-balance text-[#f5f0e8]",
								justUnlocked && "unlock-title-enter"
							)}
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
										"hover:bg-[#f5f0e8]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
										heroCopy.canOpen && justUnlocked && "unlock-cta-glow"
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
									<p className="font-sans text-sm text-[#f5f0e8]/75">
										{TEST_UNLOCK_AT_NEXT_MINUTE
											? "Opens at the next minute"
											: TEST_UNLOCK_AT_NEXT_MIDNIGHT
												? "Opens at midnight tonight"
												: "Opens September 18"}
									</p>
								)}
								{!opened && !showLockedHint && heroCopy.canOpen && (
									<p
										className={cn(
											"font-serif italic text-base sm:text-lg text-[#f5f0e8]/90",
											justUnlocked && "unlock-time-line"
										)}
									>
										Made with love, just for you.
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
