import type { JSX } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GALLERY_PHOTOS } from "@/lib/constants";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

import type { GalleryPhoto } from "@/lib/types";

function PhotoFigure({
	photo,
	className,
	priority = false,
}: {
	photo: GalleryPhoto;
	className?: string;
	priority?: boolean;
}): JSX.Element {
	return (
		<figure className={cn("group space-y-3", className)}>
			<div className="relative overflow-hidden bg-muted/40">
				<Image
					src={photo.src}
					alt={photo.caption}
					placeholder="blur"
					priority={priority}
					sizes="(min-width: 1024px) 70vw, 100vw"
					className="w-full h-auto object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.02]"
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
	);
}

/**
 * Single editorial photo feature — full-bleed, portrait, and paired frames.
 */
export function PhotoGallery(): JSX.Element {
	const frames: JSX.Element[] = [];
	let index = 0;
	let frameOrder = 0;

	while (index < GALLERY_PHOTOS.length) {
		const photo = GALLERY_PHOTOS[index];
		const layout = photo.layout ?? "full";
		const delayMs = Math.min(frameOrder * 70, 280);
		frameOrder += 1;

		if (layout === "pair") {
			const next = GALLERY_PHOTOS[index + 1];
			const pairMate = next?.layout === "pair" ? next : null;

			frames.push(
				<RevealOnScroll key={`pair-${photo.src.src}`} delayMs={delayMs}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-end">
						<PhotoFigure photo={photo} />
						{pairMate ? <PhotoFigure photo={pairMate} /> : null}
					</div>
				</RevealOnScroll>
			);

			index += pairMate ? 2 : 1;
			continue;
		}

		if (layout === "portrait") {
			frames.push(
				<RevealOnScroll key={photo.src.src} delayMs={delayMs}>
					<div className="flex justify-center">
						<PhotoFigure photo={photo} className="w-full max-w-md md:max-w-lg" />
					</div>
				</RevealOnScroll>
			);
			index += 1;
			continue;
		}

		frames.push(
			<RevealOnScroll key={photo.src.src} delayMs={delayMs}>
				<PhotoFigure photo={photo} priority={index === 0} className="w-full" />
			</RevealOnScroll>
		);
		index += 1;
	}

	return (
		<section className="py-24 md:py-32 px-4 relative z-10">
			<div className="container mx-auto max-w-5xl space-y-16 md:space-y-24">
				<RevealOnScroll>
					<header className="text-center space-y-4 max-w-2xl mx-auto">
						<p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
							Feature
						</p>
						<h2 className="font-serif text-4xl md:text-5xl text-primary text-balance">
							In this light
						</h2>
						<p className="font-serif italic text-lg text-muted-foreground">
							Frames from days that felt like a villa garden — soft stone, quiet air, you.
						</p>
					</header>
				</RevealOnScroll>
				<div className="space-y-16 md:space-y-24">{frames}</div>
			</div>
		</section>
	);
}
