import type { JSX } from "react";
import { LETTER_BODY, LETTER_GREETING, LETTER_SIGN_OFF } from "@/lib/birthday";

export function BirthdayLetter(): JSX.Element {
	return (
		<section className="py-24 md:py-32 px-4 relative z-10">
			<div className="container mx-auto max-w-3xl text-center space-y-10">
				<div className="mx-auto h-px w-16 bg-border" aria-hidden />
				<p className="font-script text-4xl md:text-5xl lg:text-6xl text-primary text-balance leading-[1.2]">
					{LETTER_GREETING}
				</p>
				<blockquote className="font-serif text-xl md:text-2xl lg:text-[1.65rem] text-foreground/80 leading-relaxed text-balance">
					{LETTER_BODY}
				</blockquote>
				<p className="font-script text-2xl md:text-3xl text-primary/80 leading-[1.3]">
					{LETTER_SIGN_OFF}
				</p>
				<div className="mx-auto h-px w-16 bg-border" aria-hidden />
			</div>
		</section>
	);
}
