import type { JSX } from "react";
import { LETTER_BODY, LETTER_GREETING, LETTER_SIGN_OFF } from "@/lib/birthday";

/**
 * Closing letter on a limestone page with paper grain and a soft drop shadow.
 */
export function BirthdayLetter(): JSX.Element {
	return (
		<section className="py-24 md:py-32 px-4 relative z-10">
			<div className="container mx-auto max-w-3xl">
				<div className="relative px-8 py-16 sm:px-12 sm:py-20 md:px-16 md:py-24 text-center">
					<div className="letter-paper-face" aria-hidden />
					<div className="relative z-10 space-y-10">
						<p className="font-script text-4xl md:text-5xl lg:text-6xl text-primary text-balance leading-[1.2]">
							{LETTER_GREETING}
						</p>
						<blockquote className="font-serif text-xl md:text-2xl lg:text-[1.65rem] text-foreground/95 leading-relaxed text-balance">
							{LETTER_BODY}
						</blockquote>
						<p className="font-script text-2xl md:text-3xl text-primary/95 leading-[1.3]">
							{LETTER_SIGN_OFF}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
