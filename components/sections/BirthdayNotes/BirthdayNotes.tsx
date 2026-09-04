import type { JSX } from "react";
import { Heart, Music, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { BIRTHDAY_NOTES } from "@/lib/birthday";

import type { BirthdayNoteIcon } from "@/lib/types";

const NOTE_ICONS: Record<BirthdayNoteIcon, LucideIcon> = {
	heart: Heart,
	music: Music,
	sun: Sun,
};

const NOTE_ICON_WRAP: Record<BirthdayNoteIcon, string> = {
	heart: "bg-primary/10",
	music: "bg-secondary/10",
	sun: "bg-yellow-200/40",
};

const NOTE_ICON_COLOR: Record<BirthdayNoteIcon, string> = {
	heart: "text-primary",
	music: "text-secondary",
	sun: "text-yellow-600/80",
};

export function BirthdayNotes(): JSX.Element {
	return (
		<section className="py-20 px-4 relative z-10">
			<div className="container mx-auto">
				<h2 className="font-serif text-4xl md:text-5xl text-center text-primary mb-16 text-balance">
					This year with you
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{BIRTHDAY_NOTES.map((note) => {
						const Icon = NOTE_ICONS[note.icon];
						return (
							<Card
								key={note.title}
								className="text-center p-8 border-pink-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
							>
								<CardContent className="space-y-4">
									<div
										className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${NOTE_ICON_WRAP[note.icon]}`}
									>
										<Icon className={`w-8 h-8 ${NOTE_ICON_COLOR[note.icon]}`} />
									</div>
									<h3 className="font-serif text-2xl text-primary">{note.title}</h3>
									<p className="text-muted-foreground leading-relaxed">{note.body}</p>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
