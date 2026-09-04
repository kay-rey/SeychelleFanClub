import type { JSX } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { GALLERY_PHOTOS } from "@/lib/constants";

export function PhotoGallery(): JSX.Element {
	return (
		<section className="py-20 px-4 relative z-10">
			<div className="container mx-auto">
				<h2 className="font-serif text-4xl md:text-5xl text-center text-primary mb-16 text-balance">
					Us
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{GALLERY_PHOTOS.map((photo) => (
						<Card
							key={photo.src}
							className="group overflow-hidden border-pink-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
						>
							<CardContent className="p-0 relative">
								<Image
									src={photo.src}
									alt={photo.caption}
									width={400}
									height={400}
									sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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
	);
}
