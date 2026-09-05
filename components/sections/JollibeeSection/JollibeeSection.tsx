import type { JSX } from "react";
import Image from "next/image";
import { JOLLIBEE_PHOTOS } from "@/lib/constants";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

/**
 * A light interlude: Seychelle meets her hero, the Jollibee mascot.
 */
export function JollibeeSection(): JSX.Element {
	return (
		<section className="py-24 md:py-32 px-4 relative z-10">
			<div className="container mx-auto max-w-5xl space-y-12 md:space-y-16">
				<header className="text-center space-y-4 max-w-2xl mx-auto">
					<p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-accent">
						Special appearance
					</p>
					<h2 className="font-serif text-4xl md:text-5xl text-primary text-balance">
						Meeting her hero
					</h2>
					<p className="font-serif italic text-lg text-muted-foreground text-balance">
						Marble columns are nice. Chickenjoy is forever. Seychelle finally met the bee.
					</p>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-end">
					{JOLLIBEE_PHOTOS.map((photo, index) => (
						<RevealOnScroll key={photo.src.src} delayMs={index * 90}>
							<figure className="space-y-3">
								<div className="relative overflow-hidden bg-muted/40">
									<Image
										src={photo.src}
										alt={photo.alt}
										placeholder="blur"
										sizes="(min-width: 768px) 40vw, 100vw"
										className="w-full h-auto object-cover"
									/>
								</div>
								<figcaption className="flex items-center gap-3 px-1">
									<span className="h-px flex-1 bg-border" aria-hidden />
									<span className="font-sans text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
										{photo.caption}
									</span>
									<span className="h-px flex-1 bg-border" aria-hidden />
								</figcaption>
							</figure>
						</RevealOnScroll>
					))}
				</div>

				<p className="font-sans text-center text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
					Bucket list: checked. Dignity: optional. The mascot approved.
				</p>
			</div>
		</section>
	);
}
