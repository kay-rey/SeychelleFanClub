"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shell, Music, Sun, Sparkles, Waves } from "lucide-react";

export default function BirthdayPage() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<div className="min-h-screen relative">
			{/* Cohesive Site-Wide Background System */}
			<div className="fixed inset-0 z-0">
				{/* Main gradient base */}
				<div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-pink-100/30 to-yellow-50" />

				{/* Layered atmospheric gradients */}
				<div className="absolute inset-0 bg-gradient-to-tr from-pink-100/20 via-transparent to-yellow-100/20" />
				<div className="absolute inset-0 bg-gradient-to-bl from-yellow-100/15 via-transparent to-pink-100/15" />

				{/* Soft light orbs for depth */}
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

			{/* Floating Background Elements - Page Wide */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
				{/* Floating Hearts */}
				<div className="floating-heart-1">
					<Heart className="w-4 h-4 text-pink-300/60" />
				</div>
				<div className="floating-heart-2">
					<Heart className="w-4 h-4 text-pink-300/60" />
				</div>
				<div className="floating-heart-3">
					<Heart className="w-4 h-4 text-pink-300/60" />
				</div>
				<div className="floating-heart-4">
					<Heart className="w-4 h-4 text-pink-300/60" />
				</div>
				<div className="floating-heart-5">
					<Heart className="w-4 h-4 text-pink-300/60" />
				</div>
				<div className="floating-heart-6">
					<Heart className="w-4 h-4 text-pink-300/60" />
				</div>
				<div className="floating-heart-7">
					<Heart className="w-4 h-4 text-pink-300/60" />
				</div>
				<div className="floating-heart-8">
					<Heart className="w-4 h-4 text-pink-300/60" />
				</div>

				{/* Floating Shells */}
				<div className="floating-shell-1">
					<Shell className="w-5 h-5 text-yellow-300/50" />
				</div>
				<div className="floating-shell-2">
					<Shell className="w-5 h-5 text-yellow-300/50" />
				</div>
				<div className="floating-shell-3">
					<Shell className="w-5 h-5 text-yellow-300/50" />
				</div>
				<div className="floating-shell-4">
					<Shell className="w-5 h-5 text-yellow-300/50" />
				</div>
				<div className="floating-shell-5">
					<Shell className="w-5 h-5 text-yellow-300/50" />
				</div>
				<div className="floating-shell-6">
					<Shell className="w-5 h-5 text-yellow-300/50" />
				</div>
			</div>

			{/* Hero Section */}
			<section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden z-10">
				{/* Hero Enhancement - Overlay on main background */}
				<div className="absolute inset-0 bg-gradient-to-b from-pink-200/30 via-pink-100/20 to-transparent" />
				<div className="absolute inset-0 bg-gradient-to-b from-yellow-200/20 via-yellow-100/10 to-transparent" />

				{/* Hero-Specific Decorative Elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					{/* Large soft orbs for hero depth */}
					<div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-pink-300/40 to-yellow-300/40 rounded-full blur-3xl" />
					<div className="absolute -top-32 -right-32 w-56 h-56 bg-gradient-to-br from-yellow-300/40 to-pink-300/40 rounded-full blur-3xl" />
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-pink-200/50 to-yellow-200/50 rounded-full blur-2xl" />
					<div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-300/35 to-transparent rounded-full blur-xl" />
					<div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-gradient-to-br from-yellow-300/35 to-transparent rounded-full blur-xl" />
				</div>

				<div className="container mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-1 lg:gap-8 items-center relative z-10">
					<div
						className={`relative order-1 lg:order-2 transition-all duration-1000 delay-300 ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 translate-x-10"
						}`}
					>
						<div className="relative py-8 lg:py-12">
							<Image
								src="/images/hero.jpg"
								alt="Seychelle Reyes"
								width={600}
								height={600}
								className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto object-cover aspect-square hero-image-shadow hero-image-clip"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-pink-100/30 to-transparent aspect-square hero-image-clip" />
						</div>
					</div>

					<div
						className={`space-y-6 text-center lg:text-left order-2 lg:order-1 transition-all duration-1000 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-10"
						}`}
					>
						{/* Decorative Text Background */}
						<div className="relative">
							<div className="absolute -inset-6 bg-gradient-to-r from-pink-100/20 to-yellow-100/20 rounded-3xl blur-xl" />
							<div className="relative">
								<h1 className="font-serif text-5xl md:text-7xl lg:text-9xl leading-tight text-balance">
									<span className="bg-gradient-to-r from-pink-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
										Happy Birthday,
									</span>
									<span className="block bg-gradient-to-r from-yellow-500 via-pink-500 to-pink-600 bg-clip-text text-transparent">
										Seychelle
									</span>
								</h1>
							</div>
						</div>

						<p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed text-pretty">
							Celebrating my amazing wife, from the Philippines to the center of
							my world.
						</p>

						{/* Enhanced Icon Row with Labels */}
						<div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
							<div className="flex items-center gap-2 bg-pink-100/40 px-4 py-2 rounded-full backdrop-blur-sm border border-pink-200/30">
								<Heart
									className="w-5 h-5 text-pink-500 float"
									style={{ animationDelay: "0.5s" }}
								/>
								<span className="text-pink-600 font-medium text-sm">Love</span>
							</div>
							<div className="flex items-center gap-2 bg-blue-100/40 px-4 py-2 rounded-full backdrop-blur-sm border border-blue-200/30">
								<Waves
									className="w-5 h-5 text-blue-500 float"
									style={{ animationDelay: "1s" }}
								/>
								<span className="text-blue-600 font-medium text-sm">
									Adventure
								</span>
							</div>
							<div className="flex items-center gap-2 bg-yellow-100/40 px-4 py-2 rounded-full backdrop-blur-sm border border-yellow-200/30">
								<Shell
									className="w-5 h-5 text-yellow-600 float"
									style={{ animationDelay: "1.5s" }}
								/>
								<span className="text-yellow-600 font-medium text-sm">
									Memories
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

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

			{/* Footer */}
			<footer className="py-8 px-4 relative z-10">
				{/* Footer Background - Fade from main background */}
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/20 to-pink-50/40" />
				<div className="container mx-auto text-center">
					<p className="text-muted-foreground">
						<a href="https://github.com/kay-rey">
							Made with love for 🐚 by 🐨.
						</a>
					</p>
				</div>
			</footer>
		</div>
	);
}
