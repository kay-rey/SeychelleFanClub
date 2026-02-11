"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shell, Music, Sun, Sparkles, Waves, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const NO_BUTTON_POSITIONS = [
	{ x: 0, y: 0 },
	{ x: 40, y: -24 },
	{ x: -32, y: 28 },
] as const;

/** Each No click: Yes gets bigger, No gets smaller. Same size at step 0. */
const BUTTON_SIZE_STEPS = [
	{ yes: "size-20 min-w-20 min-h-20 text-lg", no: "size-20 min-w-20 min-h-20 text-lg" },
	{ yes: "size-24 min-w-24 min-h-24 text-xl", no: "size-16 min-w-16 min-h-16 text-base" },
	{ yes: "size-28 min-w-28 min-h-28 text-2xl", no: "size-14 min-w-14 min-h-14 text-sm" },
	{ yes: "size-32 min-w-32 min-h-32 text-2xl", no: "size-12 min-w-12 min-h-12 text-xs" },
	{ yes: "size-36 min-w-36 min-h-36 text-3xl", no: "size-10 min-w-10 min-h-10 text-xs" },
] as const;
const MAX_NO_CLICKS = BUTTON_SIZE_STEPS.length - 1;

const CONFETTI_HEART_COUNT = 14;
const CONFETTI_RADIUS = 180;

function getConfettiHearts(): { id: number; tx: number; ty: number }[] {
	return Array.from({ length: CONFETTI_HEART_COUNT }, (_, i) => {
		const angle = (i / CONFETTI_HEART_COUNT) * 2 * Math.PI - Math.PI / 2;
		return {
			id: i,
			tx: CONFETTI_RADIUS * Math.cos(angle),
			ty: CONFETTI_RADIUS * Math.sin(angle),
		};
	});
}

const CONFETTI_HEARTS = getConfettiHearts();

export default function BirthdayPage() {
	const [isVisible, setIsVisible] = useState(false);
	const [showWrongAnswer, setShowWrongAnswer] = useState(false);
	const [isShaking, setIsShaking] = useState(false);
	const [accepted, setAccepted] = useState(false);
	const [noButtonIndex, setNoButtonIndex] = useState(0);
	const [noClickCount, setNoClickCount] = useState(0);
	const [muted, setMuted] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const nopeAudioRef = useRef<HTMLAudioElement | null>(null);
	const yayAudioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const stored = localStorage.getItem("valentine-muted");
		if (stored === "true") setMuted(true);
	}, []);

	// Prevent scrolling when overlay is active
	useEffect(() => {
		if (!accepted) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [accepted]);

	useEffect(() => {
		nopeAudioRef.current = new Audio("/sounds/nope.mp3");
		yayAudioRef.current = new Audio("/sounds/yay.mp3");
		return () => {
			nopeAudioRef.current = null;
			yayAudioRef.current = null;
		};
	}, []);

	const playNope = (): void => {
		if (muted) return;
		try {
			nopeAudioRef.current?.play?.();
		} catch {
			// ignore when files are missing
		}
	};

	const playYay = (): void => {
		if (muted) return;
		try {
			yayAudioRef.current?.play?.();
		} catch {
			// ignore when files are missing
		}
	};

	const toggleMuted = (): void => {
		setMuted((m: boolean) => {
			const next = !m;
			localStorage.setItem("valentine-muted", String(next));
			return next;
		});
	};

	const handleNoClick = (): void => {
		// Move button first so it "runs away" as soon as they try to press it
		setNoButtonIndex((i: number) => (i + 1) % NO_BUTTON_POSITIONS.length);
		setNoClickCount((c: number) => Math.min(c + 1, MAX_NO_CLICKS));
		setShowWrongAnswer(true);
		setIsShaking(true);
		playNope();
		setTimeout(() => {
			setShowWrongAnswer(false);
			setIsShaking(false);
		}, 1500);
	};

	const handleYesClick = (): void => {
		setShowConfetti(true);
		playYay();
		setAccepted(true);
		setTimeout(() => setShowConfetti(false), 1600);
		setTimeout(() => {
			contentRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 400);
	};

	return (
		<div className={cn("min-h-screen relative", isShaking && "animate-shake")}>
			{/* Wrong-answer red overlay - above hero and block overlay so it shows when No is clicked */}
			{showWrongAnswer && (
				<div
					className="fixed inset-0 z-[70] bg-red-500/40 pointer-events-none"
					aria-hidden
				/>
			)}

			{/* CSS-only heart confetti burst on Yes */}
			{showConfetti && (
				<div
					className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center"
					aria-hidden
				>
					{CONFETTI_HEARTS.map(({ id, tx, ty }) => (
						<div
							key={`confetti-${id}`}
							className="confetti-heart absolute"
							style={
								{
									"--tx": `${tx}px`,
									"--ty": `${ty}px`,
								} as React.CSSProperties
							}
						>
							<Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
						</div>
					))}
				</div>
			)}

			{/* Cohesive Site-Wide Background System */}
			<div className="fixed inset-0 z-0">
				<div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-pink-100/30 to-yellow-50" />
				<div className="absolute inset-0 bg-gradient-to-tr from-pink-100/20 via-transparent to-yellow-100/20" />
				<div className="absolute inset-0 bg-gradient-to-bl from-yellow-100/15 via-transparent to-pink-100/15" />
				<div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-pink-200/10 via-transparent to-transparent" />
				<div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-yellow-200/10 via-transparent to-transparent" />
			</div>

			{/* Floating Sparkles */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className="absolute sparkle"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 2}s`,
						}}
					>
						<Sparkles className="w-4 h-4 text-pink-300" />
					</div>
				))}
			</div>

			{/* Floating Background Elements */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
				{[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
					<div key={`heart-${n}`} className={`floating-heart-${n}`}>
						<Heart className="w-4 h-4 text-pink-300/60" />
					</div>
				))}
				{[1, 2, 3, 4, 5, 6].map((n) => (
					<div key={`shell-${n}`} className={`floating-shell-${n}`}>
						<Shell className="w-5 h-5 text-yellow-300/50" />
					</div>
				))}
			</div>

			{/* Valentine Hero Section */}
			<section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden z-[60]">
				<div className="absolute inset-0 bg-gradient-to-b from-pink-200/30 via-pink-100/20 to-transparent" />
				<div className="absolute inset-0 bg-gradient-to-b from-yellow-200/20 via-yellow-100/10 to-transparent" />
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-pink-300/40 to-yellow-300/40 rounded-full blur-3xl" />
					<div className="absolute -top-32 -right-32 w-56 h-56 bg-gradient-to-br from-yellow-300/40 to-pink-300/40 rounded-full blur-3xl" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-pink-200/50 to-yellow-200/50 rounded-full blur-2xl" />
				</div>

				{/* Mute button - mobile-first 44px touch target */}
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
						"relative z-10 text-center space-y-8 transition-all duration-1000 w-full max-w-2xl mx-auto",
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
					)}
				>
					<div className="relative">
						<div className="absolute -inset-4 bg-gradient-to-r from-pink-100/20 to-yellow-100/20 rounded-3xl blur-xl" />
						<h1 className="relative font-serif text-4xl sm:text-5xl md:text-6xl leading-tight text-balance px-2">
							<span className="block bg-gradient-to-r from-pink-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
								Seychelle, will you be my valentine?
							</span>
						</h1>
					</div>

					{/* Fixed-height slot so error message doesn't shift buttons */}
					<div className="min-h-10 flex items-center justify-center">
						{showWrongAnswer && (
							<p className="text-lg font-semibold text-red-600 animate-pulse">
								Wrong answer! Try the other one.
							</p>
						)}
					</div>

					{/* Buttons: square, side by side; Yes grows / No shrinks on each No click */}
					{(() => {
						const step = BUTTON_SIZE_STEPS[Math.min(noClickCount, MAX_NO_CLICKS)];
						return (
							<div className="flex flex-row items-center justify-center gap-4">
								<Button
									size="lg"
									onClick={handleYesClick}
									className={cn(
										"aspect-square font-serif rounded-lg transition-all duration-300",
										step.yes
									)}
								>
									Yes
								</Button>
								<div
									className={cn(
										"relative aspect-square transition-all duration-300",
										"size-20 min-w-20 min-h-20",
										noClickCount >= 1 && "size-16 min-w-16 min-h-16",
										noClickCount >= 2 && "size-14 min-w-14 min-h-14",
										noClickCount >= 3 && "size-12 min-w-12 min-h-12",
										noClickCount >= 4 && "size-10 min-w-10 min-h-10"
									)}
									aria-hidden
								>
									<Button
										size="lg"
										variant="outline"
										onClick={handleNoClick}
										className={cn(
											"absolute inset-0 aspect-square font-serif rounded-lg transition-all duration-300 ease-out",
											step.no
										)}
										style={{
											transform: `translate(${NO_BUTTON_POSITIONS[noButtonIndex].x}px, ${NO_BUTTON_POSITIONS[noButtonIndex].y}px)`,
										}}
									>
										No
									</Button>
								</div>
							</div>
						);
					})()}

					{accepted && (
						<p className="font-serif text-xl text-pink-600">Yay! Best valentine ever.</p>
					)}
				</div>
			</section>

			{/* Content below hero - only in DOM after Yes (no overlay needed, no z-index issues) */}
			{accepted && (
			<>
			<div ref={contentRef}>
				{/* Photo Gallery Section */}
				<section className="py-20 px-4 relative z-10">
					<div className="container mx-auto">
						<h2 className="font-serif text-4xl md:text-5xl text-center text-primary mb-16 text-balance">
							Our Favorite Moments
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[
								{
									src: "/images/gallery/beach.JPG",
									caption: "Beach adventures together",
								},
								{
									src: "/images/gallery/firstdate.jpg",
									caption: "Our first date memories",
								},
								{
									src: "/images/gallery/aquarium.jpeg",
									caption: "Exploring the aquarium",
								},
								{
									src: "/images/gallery/dodgers.jpg",
									caption: "Dodgers game fun",
								},
								{
									src: "/images/gallery/christmas.jpeg",
									caption: "Christmas celebrations",
								},
								{
									src: "/images/gallery/pikachu.jpg",
									caption: "Adventures with Pikachu",
								},
							].map((photo, index) => (
								<Card
									key={index}
									className="group overflow-hidden border-pink-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
								>
									<CardContent className="p-0 relative">
										<Image
											src={photo.src || "/placeholder.svg"}
											alt={photo.caption}
											width={400}
											height={400}
											className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										<div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<p className="font-medium text-sm">{photo.caption}</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Her Favorites Section */}
				<section className="py-20 px-4 relative z-10">
					<div className="container mx-auto">
						<h2 className="font-serif text-4xl md:text-5xl text-center text-primary mb-16 text-balance">
							Her Favorites
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<Card className="text-center p-8 border-pink-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
								<CardContent className="space-y-4">
									<div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
										<Heart className="w-8 h-8 text-primary" />
									</div>
									<h3 className="font-serif text-2xl text-primary">
										A Heart of Gold
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										She has a way of making everyone around her feel special. Her
										kindness is a quiet strength that makes the world better.
									</p>
								</CardContent>
							</Card>

							<Card className="text-center p-8 border-pink-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
								<CardContent className="space-y-4">
									<div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center">
										<Music className="w-8 h-8 text-secondary" />
									</div>
									<h3 className="font-serif text-2xl text-primary">Pop Queen</h3>
									<p className="text-muted-foreground leading-relaxed">
										From Sabrina Carpenter to the Backstreet Boys, she always
										loves to sing in my ear.
									</p>
								</CardContent>
							</Card>

							<Card className="text-center p-8 border-pink-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
								<CardContent className="space-y-4">
									<div className="w-16 h-16 mx-auto bg-yellow-200/50 rounded-full flex items-center justify-center">
										<Sun className="w-8 h-8 text-yellow-600" />
									</div>
									<h3 className="font-serif text-2xl text-primary">
										Endless Summer
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										She&apos;s a true sun-seeker, happiest with her toes in the
										sand and the sound of the waves.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Music Playlist Section */}
				<section className="py-20 px-4 relative z-10">
					<div className="container mx-auto max-w-4xl">
						<h2 className="font-serif text-4xl md:text-5xl text-center text-primary mb-8 text-balance">
							Seychelle&apos;s Birthday Mix
						</h2>
						<p className="text-center text-xl text-muted-foreground mb-12">
							Your favorite jams to celebrate your special day.
						</p>

						{/* Spotify Embed */}
						<div className="w-full">
							<iframe
								data-testid="embed-iframe"
								style={{ borderRadius: "12px" }}
								src="https://open.spotify.com/embed/playlist/5IrFirNl36ko5uZjHEfd5z?utm_source=generator"
								width="100%"
								height="500"
								frameBorder="0"
								allowFullScreen={true}
								allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
								loading="lazy"
							></iframe>
						</div>
					</div>
				</section>

				{/* Final Message Section */}
				<section className="py-20 px-4 relative z-10">
					<div className="container mx-auto max-w-4xl text-center">
						<div className="space-y-8">
							<blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary leading-relaxed text-balance">
								For Seychelle, the light of my life. Just like a perfect day at
								the beach, you bring warmth and sunshine to my world. Of all the
								treasures in the world, I was lucky enough to find you. You are
								the melody to my favorite song and the calm in my ocean. My love
								for you is deeper than any sea in the universe.
							</blockquote>
							<p className="font-serif text-xl text-primary">
								- With all my love
							</p>
							<div className="flex justify-center gap-4 pt-8">
								<Heart className="w-8 h-8 text-pink-400 float" />
								<Shell
									className="w-8 h-8 text-primary float"
									style={{ animationDelay: "0.5s" }}
								/>
								<Heart
									className="w-8 h-8 text-pink-400 float"
									style={{ animationDelay: "1s" }}
								/>
							</div>
						</div>
					</div>
				</section>

			</div>

			{/* Footer - same as content, only after Yes */}
			<footer className="py-8 px-4 relative z-10">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/20 to-pink-50/40" />
				<div className="container mx-auto text-center">
					<p className="text-muted-foreground">
						<a href="https://github.com/kay-rey">
							Made with love for 🐚 by 🐨.
						</a>
					</p>
				</div>
			</footer>
			</>
			)}
		</div>
	);
}
