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
		src: "/images/gallery/beach.JPG",
		caption: "Beach adventures together",
	},
	{
		src: "/images/gallery/firstdate.jpg",
		caption: "Our first date memories",
	},
	{
		src: "/images/gallery/aquarium.jpeg",
		caption: "Exploring the aquarium",
	},
	{
		src: "/images/gallery/dodgers.jpg",
		caption: "Dodgers game fun",
	},
	{
		src: "/images/gallery/christmas.jpeg",
		caption: "Christmas celebrations",
	},
	{
		src: "/images/gallery/pikachu.jpg",
		caption: "Adventures with Pikachu",
	},
];
