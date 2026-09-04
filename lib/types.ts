export interface GalleryPhoto {
	src: string;
	caption: string;
}

export type BirthdayNoteIcon = "heart" | "music" | "sun";

export interface BirthdayNote {
	icon: BirthdayNoteIcon;
	title: string;
	body: string;
}

export interface HeroCopy {
	title: string;
	subtitle: string | null;
	giftAriaLabel: string;
	successMessage: string;
}

export interface ConfettiPiece {
	id: number;
	tx: number;
	ty: number;
}
