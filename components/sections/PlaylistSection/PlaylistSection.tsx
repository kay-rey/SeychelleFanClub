import type { JSX } from "react";
import { SPOTIFY_PLAYLIST_EMBED_URL } from "@/lib/constants";

export function PlaylistSection(): JSX.Element {
	return (
		<section className="py-20 px-4 relative z-10">
			<div className="container mx-auto max-w-4xl">
				<h2 className="font-serif text-4xl md:text-5xl text-center text-primary mb-8 text-balance">
					Your birthday mix
				</h2>
				<p className="text-center text-xl text-muted-foreground mb-12">
					Songs that remind me of you.
				</p>
				<div className="w-full">
					<iframe
						title="Birthday playlist on Spotify"
						style={{ borderRadius: "12px" }}
						src={SPOTIFY_PLAYLIST_EMBED_URL}
						width="100%"
						height="352"
						allowFullScreen
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
					/>
				</div>
			</div>
		</section>
	);
}
