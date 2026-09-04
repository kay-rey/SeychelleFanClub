import type { JSX } from "react";
import { BirthdayExperience } from "@/components/sections/BirthdayExperience/BirthdayExperience";
import { PhotoGallery } from "@/components/sections/PhotoGallery/PhotoGallery";
import { JollibeeSection } from "@/components/sections/JollibeeSection/JollibeeSection";
import { BirthdayNotes } from "@/components/sections/BirthdayNotes/BirthdayNotes";
import { PlaylistSection } from "@/components/sections/PlaylistSection/PlaylistSection";
import { BirthdayLetter } from "@/components/sections/BirthdayLetter/BirthdayLetter";
import { SiteFooter } from "@/components/sections/SiteFooter/SiteFooter";

export default function HomePage(): JSX.Element {
	return (
		<BirthdayExperience>
			<PhotoGallery />
			<JollibeeSection />
			<BirthdayNotes />
			<PlaylistSection />
			<BirthdayLetter />
			<SiteFooter />
		</BirthdayExperience>
	);
}
