import type { GalleryPhoto, JollibeePhoto } from "@/lib/types";

import coverP1031328 from "@/public/images/birthday/p1031328.jpg";
import galleryP1031314 from "@/public/images/birthday/p1031314.jpg";
import galleryP1031386 from "@/public/images/birthday/p1031386.jpg";
import galleryP1000144 from "@/public/images/birthday/p1000144.jpg";
import galleryP1000155 from "@/public/images/birthday/p1000155.jpg";
import galleryP1000188 from "@/public/images/birthday/p1000188.jpg";
import galleryP1000132 from "@/public/images/birthday/p1000132.jpg";
import galleryP1000236 from "@/public/images/birthday/p1000236.jpg";
import galleryP1000012 from "@/public/images/birthday/p1000012.jpg";
import galleryP1000084 from "@/public/images/birthday/p1000084.jpg";
import galleryImg3626 from "@/public/images/birthday/img_3626.jpg";
import galleryP1051906 from "@/public/images/birthday/p1051906.jpg";
import galleryP1000051 from "@/public/images/birthday/p1000051.jpg";
import galleryP1000030 from "@/public/images/birthday/p1000030.jpg";
import jollibeeMascotEvent from "@/public/images/birthday/jollibee/mascot-event.jpg";
import jollibeeStatue from "@/public/images/birthday/jollibee/jollibee.jpg";

/**
 * Full-bleed editorial cover — Outer Peristyle at the Getty Villa.
 * Static import enables Next.js blur placeholders.
 */
export const COVER_IMAGE = {
	src: coverP1031328,
	alt: "Seychelle in a white dress beside the Outer Peristyle fountain at the Getty Villa",
} as const;

/**
 * Editorial gallery after unlock.
 * High-quality web copies (max 3840px, q92); camera originals stay in `originals/` (gitignored).
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
	{
		src: galleryP1031386,
		caption: "Light on the railing",
		layout: "portrait",
	},
	{
		src: galleryP1000144,
		caption: "Over the shoulder",
		layout: "pair",
	},
	{
		src: galleryP1000155,
		caption: "Under the arches",
		layout: "pair",
	},
	{
		src: galleryP1000188,
		caption: "Stone and shadow",
		layout: "full",
	},
	{
		src: galleryP1000132,
		caption: "Afternoon wall",
		layout: "portrait",
	},
	{
		src: galleryP1000236,
		caption: "On the lawn",
		layout: "pair",
	},
	{
		src: galleryP1000012,
		caption: "Classical light",
		layout: "pair",
	},
	{
		src: galleryP1031314,
		caption: "The long gallery",
		layout: "full",
	},
	{
		src: galleryP1000084,
		caption: "The winding road",
		layout: "portrait",
	},
	{
		src: galleryImg3626,
		caption: "Coastline",
		layout: "pair",
	},
	{
		src: galleryP1051906,
		caption: "Hills above the city",
		layout: "pair",
	},
	{
		src: galleryP1000051,
		caption: "Historic Filipinotown",
		layout: "full",
	},
	{
		src: galleryP1000030,
		caption: "Midday sun",
		layout: "portrait",
	},
];

/** Cheeky hero meet-cute — kept out of the main editorial gallery. */
export const JOLLIBEE_PHOTOS: JollibeePhoto[] = [
	{
		src: jollibeeMascotEvent,
		alt: "Seychelle posing with the Jollibee mascot at an outdoor event",
		caption: "First contact",
	},
	{
		src: jollibeeStatue,
		alt: "Seychelle giving a thumbs-up beside the Jollibee statue outside the restaurant",
		caption: "The shrine",
	},
];

/** Local birthday song — plays when the feature opens. */
export const BIRTHDAY_SONG = "/sounds/birthdaysong2026/seychellebirthdaysong.mp3";

export const NO_SOUNDS = [
	"/sounds/no/fahhh.mp3",
	"/sounds/no/buzzer.mp3",
	"/sounds/no/error.mp3",
	"/sounds/no/fart.mp3",
] as const;

export const YES_SOUND = "/sounds/yes/myinstants.mp3";

export const AUDIO_FILES = [BIRTHDAY_SONG, YES_SOUND, ...NO_SOUNDS] as const;

export const SPOTIFY_PLAYLIST_EMBED_URL =
	"https://open.spotify.com/embed/playlist/4Pz6z80H9oZHUj50W9GX6C?utm_source=generator";
