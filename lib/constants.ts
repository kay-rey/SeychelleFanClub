import type { GalleryPhoto } from "@/lib/types";

/**
 * Gallery photos displayed after the gift unwraps.
 * Paths currently point at the existing set; swap the folder to `/images/birthday/` when new shots are ready.
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
	{
		src: "/images/valentines/weddingsquare.jpg",
		caption: "Our wedding",
	},
	{
		src: "/images/valentines/firstdate.jpg",
		caption: "Our first date memories",
	},
	{
		src: "/images/valentines/game.jpg",
		caption: "Galaxy game day together",
	},
	{
		src: "/images/valentines/ramsgame.jpg",
		caption: "Rams game with Tito and Tita",
	},
	{
		src: "/images/valentines/santamonica.jpg",
		caption: "A day in Santa Monica",
	},
	{
		src: "/images/valentines/nightmarebeforexmasshow.jpg",
		caption: "Nightmare Before Christmas show",
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
