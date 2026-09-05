import type { StaticImageData } from "next/image";

export type GalleryLayout = "full" | "portrait" | "pair";

export interface GalleryPhoto {
	src: StaticImageData;
	caption: string;
	layout?: GalleryLayout;
}

export interface JollibeePhoto {
	src: StaticImageData;
	alt: string;
	caption: string;
}

export type BirthdayNoteIcon = "leaf" | "heart" | "sun";

export interface BirthdayNote {
	icon: BirthdayNoteIcon;
	title: string;
	body: string;
}

export interface HeroCopy {
	title: string;
	subtitle: string | null;
	openAriaLabel: string;
	successMessage: string;
	canOpen: boolean;
	lockedHint: string | null;
}

export interface ConfettiPiece {
	id: number;
	tx: number;
	ty: number;
	size?: number;
	delayMs?: number;
	tone?: "gold" | "cream" | "terracotta" | "olive";
}

export interface CountdownParts {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	totalMs: number;
}
