import type { JSX } from "react";
import { SPOTIFY_PLAYLIST_EMBED_URL } from "@/lib/constants";

export function PlaylistSection(): JSX.Element {
	return (
		<section className="py-24 md:py-32 px-4 relative z-10">
			<div className="container mx-auto max-w-3xl">
				<header className="text-center space-y-4 mb-12">
					<p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
						Listening
					</p>
					<h2 className="font-serif text-4xl md:text-5xl text-primary text-balance">
						Your birthday mix
					</h2>
					<p className="font-serif italic text-lg text-muted-foreground">
						Songs for the drives, the quiet hours, and you.
					</p>
				</header>
				<div className="w-full border border-border/80 overflow-hidden bg-[#f5f0e8]/60">
					<iframe
						title="Birthday playlist on Spotify"
						src={SPOTIFY_PLAYLIST_EMBED_URL}
						width="100%"
						height="352"
						allowFullScreen
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
						className="block w-full"
					/>
				</div>
			</div>
		</section>
	);
}
