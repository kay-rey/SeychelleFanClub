"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shell, Music, Sun, Sparkles, Waves } from "lucide-react";

export default function BirthdayPage() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-pink-50">
			{/* Floating Sparkles */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden">
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

			{/* Hero Section */}
			<section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
				<div className="gradient-bg absolute inset-0 opacity-30" />
				<div className="container mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-1 lg:gap-12 items-center relative z-10">
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
								className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto object-cover"
								style={{
									aspectRatio: 1,
									clipPath: `shape(
										from 50% 91%,
										line to 90% 50%,
										arc to 50% 9% of 1%,
										arc to 10% 50% of 1%
									)`,
									filter: "drop-shadow(0 25px 50px -12px rgba(0, 0, 0, 0.25))",
								}}
							/>
							<div
								className="absolute inset-0 bg-gradient-to-t from-pink-100/20 to-transparent"
								style={{
									aspectRatio: 1,
									clipPath: `shape(
									from 50% 91%,
									line to 90% 50%,
									arc to 50% 9% of 1%,
									arc to 10% 50% of 1%
								)`,
								}}
							/>
						</div>
					</div>

					<div
						className={`space-y-6 text-center lg:text-left order-2 lg:order-1 transition-all duration-1000 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-10"
						}`}
					>
						<h1 className="font-serif text-4xl md:text-6xl lg:text-8xl text-primary leading-tight text-balance">
							Happy Birthday,
							<span className="block text-secondary">Seychelle</span>
						</h1>
						<p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed text-pretty">
							A celebration of my amazing wife, from the shores of the
							Philippines to here.
						</p>
						<div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
							<Heart
								className="w-6 h-6 text-pink-400 float"
								style={{ animationDelay: "0.5s" }}
							/>
							<Waves
								className="w-8 h-8 text-blue-300 float"
								style={{ animationDelay: "1s" }}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Photo Gallery Section */}
			<section className="py-20 px-4">
				<div className="container mx-auto">
					<h2 className="font-serif text-4xl md:text-5xl text-center text-primary mb-16 text-balance">
						Our Favorite Moments
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								src: "/placeholder-f5v0v.png",
								caption: "Beach sunset together",
							},
							{
								src: "/placeholder-dheyd.png",
								caption: "Your beautiful laugh",
							},
							{ src: "/placeholder-txb2r.png", caption: "Paradise found" },
							{
								src: "/placeholder-9o1vo.png",
								caption: "Dancing the night away",
							},
							{ src: "/placeholder-l90gm.png", caption: "Collecting memories" },
							{ src: "/placeholder-6z0fl.png", caption: "Pure happiness" },
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
										height={300}
										className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
			<section className="py-20 px-4 bg-gradient-to-r from-pink-50 to-yellow-50">
				<div className="container mx-auto">
					<h2 className="font-serif text-4xl md:text-5xl text-center text-primary mb-16 text-balance">
						Her Favorites
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<Card className="text-center p-8 border-pink-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
							<CardContent className="space-y-4">
								<div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
									<Shell className="w-8 h-8 text-primary" />
								</div>
								<h3 className="font-serif text-2xl text-primary">
									Endless Summer
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									For her love of the beach, the sun, and the sound of the
									waves.
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
									From Sabrina Carpenter to the Backstreet Boys, she&apos;s
									always got the best playlist.
								</p>
							</CardContent>
						</Card>

						<Card className="text-center p-8 border-pink-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
							<CardContent className="space-y-4">
								<div className="w-16 h-16 mx-auto bg-yellow-200/50 rounded-full flex items-center justify-center">
									<Sun className="w-8 h-8 text-yellow-600" />
								</div>
								<h3 className="font-serif text-2xl text-primary">
									Proudly Filipina
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									Celebrating her beautiful heritage and home.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Music Playlist Section */}
			<section className="py-20 px-4">
				<div className="container mx-auto max-w-4xl">
					<h2 className="font-serif text-4xl md:text-5xl text-center text-primary mb-8 text-balance">
						Seychelle&apos;s Birthday Mix
					</h2>
					<p className="text-center text-xl text-muted-foreground mb-12">
						A few of your favorite tracks to celebrate your day.
					</p>
					<Card className="p-8 border-pink-200">
						<CardContent className="space-y-6">
							<div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
								<Music className="w-16 h-16 mx-auto text-primary mb-4" />
								<h3 className="font-serif text-2xl text-primary mb-4">
									Your Playlist Awaits
								</h3>
								<p className="text-muted-foreground mb-6">
									Connect your Spotify or Apple Music to play your favorite
									birthday songs
								</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Button className="bg-green-600 hover:bg-green-700 text-white">
										Open in Spotify
									</Button>
									<Button
										variant="outline"
										className="border-pink-300 text-primary hover:bg-pink-50 bg-transparent"
									>
										Open in Apple Music
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Final Message Section */}
			<section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
				<div className="container mx-auto max-w-4xl text-center">
					<div className="space-y-8">
						<blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary leading-relaxed text-balance">
							&ldquo;Every day with you feels like a celebration, but today we
							get to make it official. Your smile lights up every room, your
							laugh is my favorite song, and your heart is the most beautiful
							thing I&apos;ve ever known. Here&apos;s to another year of
							adventures, beach days, and endless love.&rdquo;
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
			<footer className="py-12 px-4 bg-white/50">
				<div className="container mx-auto text-center">
					<p className="text-muted-foreground">
						Made with love for Seychelle Reyes on her birthday.
					</p>
					<div className="flex justify-center gap-2 mt-4">
						<Sparkles className="w-4 h-4 text-pink-300" />
						<Heart className="w-4 h-4 text-pink-400" />
						<Sparkles className="w-4 h-4 text-pink-300" />
					</div>
				</div>
			</footer>
		</div>
	);
}
