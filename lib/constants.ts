import type { GalleryPhoto } from "@/lib/types";

/**
 * Full-bleed editorial cover — Getty Villa corridor.
 */
export const COVER_IMAGE = {
	src: "/images/birthday/p1031314.jpg",
	alt: "Seychelle in a white dress along a columned corridor at the Getty Villa",
} as const;

/**
 * Editorial gallery after unlock.
 * High-quality web copies (max 3840px, q92); camera originals stay in `originals/` (gitignored).
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
	{
		src: "/images/birthday/p1031328.jpg",
		caption: "Outer Peristyle",
		layout: "full",
		width: 2560,
		height: 3840,
	},
	{
		src: "/images/birthday/p1031386.jpg",
		caption: "Light on the railing",
		layout: "portrait",
		width: 2560,
		height: 3840,
	},
	{
		src: "/images/birthday/p1000144.jpg",
		caption: "Over the shoulder",
		layout: "pair",
		width: 3840,
		height: 2560,
	},
	{
		src: "/images/birthday/p1000155.jpg",
		caption: "Under the arches",
		layout: "pair",
		width: 3840,
		height: 2560,
	},
	{
		src: "/images/birthday/p1000188.jpg",
		caption: "Stone and shadow",
		layout: "full",
		width: 2560,
		height: 3840,
	},
	{
		src: "/images/birthday/p1000132.jpg",
		caption: "Afternoon wall",
		layout: "portrait",
		width: 2560,
		height: 3840,
	},
	{
		src: "/images/birthday/p1000236.jpg",
		caption: "On the lawn",
		layout: "pair",
		width: 2560,
		height: 3840,
	},
	{
		src: "/images/birthday/p1000012.jpg",
		caption: "Classical light",
		layout: "pair",
		width: 2560,
		height: 3840,
	},
	{
		src: "/images/birthday/p1031314.jpg",
		caption: "The long gallery",
		layout: "full",
		width: 2560,
		height: 3840,
	},
	{
		src: "/images/birthday/p1000084.jpg",
		caption: "The winding road",
		layout: "portrait",
		width: 3072,
		height: 3840,
	},
	{
		src: "/images/birthday/img_3626.jpg",
		caption: "Coastline",
		layout: "pair",
		width: 2880,
		height: 3840,
	},
	{
		src: "/images/birthday/p1051906.jpg",
		caption: "Hills above the city",
		layout: "pair",
		width: 2560,
		height: 3840,
	},
	{
		src: "/images/birthday/p1000051.jpg",
		caption: "Historic Filipinotown",
		layout: "full",
		width: 3072,
		height: 3840,
	},
	{
		src: "/images/birthday/p1000030.jpg",
		caption: "Midday sun",
		layout: "portrait",
		width: 2560,
		height: 3840,
	},
];

export interface JollibeePhoto {
	src: string;
	alt: string;
	caption: string;
	width: number;
	height: number;
}

/** Cheeky hero meet-cute — kept out of the main editorial gallery. */
export const JOLLIBEE_PHOTOS: JollibeePhoto[] = [
	{
		src: "/images/birthday/jollibee/mascot-event.jpg",
		alt: "Seychelle posing with the Jollibee mascot at an outdoor event",
		caption: "First contact",
		width: 2560,
		height: 3840,
	},
	{
		src: "/images/birthday/jollibee/jollibee.jpg",
		alt: "Seychelle giving a thumbs-up beside the Jollibee statue outside the restaurant",
		caption: "The shrine",
		width: 2560,
		height: 3840,
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
