/**
 * Gallery photo data structure
 */
export interface GalleryPhoto {
	src: string;
	caption: string;
}

/**
 * Gallery photos displayed in the photo gallery section
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
