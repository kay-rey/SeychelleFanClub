import type { JSX } from "react";
import { Heart, Leaf, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { BIRTHDAY_NOTES } from "@/lib/birthday";

import type { BirthdayNoteIcon } from "@/lib/types";

const NOTE_ICONS: Record<BirthdayNoteIcon, LucideIcon> = {
	leaf: Leaf,
	heart: Heart,
	sun: Sun,
};

export function BirthdayNotes(): JSX.Element {
	return (
		<section className="py-24 md:py-32 px-4 relative z-10">
			<div className="container mx-auto max-w-5xl">
				<header className="text-center space-y-4 mb-16 md:mb-20">
					<p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
						This year
					</p>
					<h2 className="font-serif text-4xl md:text-5xl text-primary text-balance">
						With you
					</h2>
				</header>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
					{BIRTHDAY_NOTES.map((note) => {
						const Icon = NOTE_ICONS[note.icon];
						return (
							<article key={note.title} className="text-center space-y-5">
								<div className="mx-auto flex h-10 w-10 items-center justify-center text-primary/70">
									<Icon className="h-6 w-6" aria-hidden />
								</div>
								<div className="mx-auto h-px w-10 bg-border" aria-hidden />
								<h3 className="font-serif text-2xl text-primary">{note.title}</h3>
								<p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
									{note.body}
								</p>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
