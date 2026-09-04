export type GalleryLayout = "full" | "portrait" | "pair";

export interface GalleryPhoto {
	src: string;
	caption: string;
	layout?: GalleryLayout;
	width: number;
	height: number;
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
}

export interface CountdownParts {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	totalMs: number;
}
