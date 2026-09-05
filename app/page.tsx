import type { JSX } from "react";
import { BirthdayExperience } from "@/components/sections/BirthdayExperience/BirthdayExperience";
import { PhotoGallery } from "@/components/sections/PhotoGallery/PhotoGallery";
import { JollibeeSection } from "@/components/sections/JollibeeSection/JollibeeSection";
import { BirthdayNotes } from "@/components/sections/BirthdayNotes/BirthdayNotes";
import { PlaylistSection } from "@/components/sections/PlaylistSection/PlaylistSection";
import { CatalinaWeekend } from "@/components/sections/CatalinaWeekend/CatalinaWeekend";
import { BirthdayLetter } from "@/components/sections/BirthdayLetter/BirthdayLetter";
import { SiteFooter } from "@/components/sections/SiteFooter/SiteFooter";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export default function HomePage(): JSX.Element {
	return (
		<BirthdayExperience>
			<PhotoGallery />
			<RevealOnScroll>
				<JollibeeSection />
			</RevealOnScroll>
			<RevealOnScroll delayMs={60}>
				<BirthdayNotes />
			</RevealOnScroll>
			<RevealOnScroll delayMs={60}>
				<PlaylistSection />
			</RevealOnScroll>
			<RevealOnScroll delayMs={60}>
				<CatalinaWeekend />
			</RevealOnScroll>
			<RevealOnScroll delayMs={60}>
				<BirthdayLetter />
			</RevealOnScroll>
			<RevealOnScroll delayMs={40}>
				<SiteFooter />
			</RevealOnScroll>
		</BirthdayExperience>
	);
}
