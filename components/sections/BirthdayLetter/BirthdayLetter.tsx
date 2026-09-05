import type { JSX } from "react";
import { LETTER_BODY, LETTER_GREETING, LETTER_SIGN_OFF } from "@/lib/birthday";

export function BirthdayLetter(): JSX.Element {
	return (
		<section className="py-24 md:py-32 px-4 relative z-10">
			<div className="container mx-auto max-w-3xl">
				<div className="relative overflow-hidden border border-border/70 bg-[#f5f0e8]/50 px-8 py-16 sm:px-12 sm:py-20 md:px-16 md:py-24 text-center">
					<div
						className="pointer-events-none absolute inset-0 opacity-40"
						style={{
							background:
								"radial-gradient(ellipse at 50% 0%, oklch(0.88 0.04 220 / 0.35), transparent 55%), radial-gradient(ellipse at 80% 100%, oklch(0.86 0.05 85 / 0.25), transparent 45%)",
						}}
						aria-hidden
					/>
					<div className="relative space-y-10">
						<p className="font-script text-4xl md:text-5xl lg:text-6xl text-primary text-balance leading-[1.2]">
							{LETTER_GREETING}
						</p>
						<blockquote className="font-serif text-xl md:text-2xl lg:text-[1.65rem] text-foreground/80 leading-relaxed text-balance">
							{LETTER_BODY}
						</blockquote>
						<p className="font-script text-2xl md:text-3xl text-primary/80 leading-[1.3]">
							{LETTER_SIGN_OFF}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
