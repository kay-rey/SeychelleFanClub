import type { GalleryPhoto } from "@/lib/types";

/**
 * Full-bleed editorial cover. Swap to a Getty Villa still when ready.
 */
export const COVER_IMAGE = {
	src: "/images/hero.jpg",
	alt: "Soft light over warm stone — birthday cover for Seychelle",
} as const;

/**
 * Editorial gallery after unlock.
 * Paths still use existing shots as stand-ins; move files to `/images/birthday/` when ready.
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
	{
		src: "/images/valentines/weddingsquare.jpg",
		caption: "Light on stone",
		layout: "full",
		width: 1600,
		height: 1067,
	},
	{
		src: "/images/valentines/firstdate.jpg",
		caption: "A quiet afternoon",
		layout: "portrait",
		width: 900,
		height: 1200,
	},
	{
		src: "/images/valentines/santamonica.jpg",
		caption: "Garden air",
		layout: "pair",
		width: 1600,
		height: 1067,
	},
	{
		src: "/images/valentines/game.jpg",
		caption: "Together",
		layout: "pair",
		width: 1600,
		height: 1067,
	},
	{
		src: "/images/valentines/ramsgame.jpg",
		caption: "Golden hour",
		layout: "full",
		width: 1600,
		height: 1067,
	},
	{
		src: "/images/valentines/nightmarebeforexmasshow.jpg",
		caption: "Evening quiet",
		layout: "portrait",
		width: 900,
		height: 1200,
	},
];

export const NO_SOUNDS = [
	"/sounds/no/fahhh.mp3",
	"/sounds/no/buzzer.mp3",
	"/sounds/no/error.mp3",
	"/sounds/no/fart.mp3",
] as const;

export const YES_SOUND = "/sounds/yes/myinstants.mp3";

export const AUDIO_FILES = [YES_SOUND, ...NO_SOUNDS] as const;

export const SPOTIFY_PLAYLIST_EMBED_URL =
	"https://open.spotify.com/embed/playlist/4Pz6z80H9oZHUj50W9GX6C?utm_source=generator";
