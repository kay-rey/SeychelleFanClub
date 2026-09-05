import type { JSX } from "react";
import { LETTER_BODY, LETTER_GREETING, LETTER_SIGN_OFF } from "@/lib/birthday";

/**
 * Closing letter on a limestone page with a faint deckled edge.
 * Deckle is applied only to the paper face so the type stays sharp.
 */
export function BirthdayLetter(): JSX.Element {
	return (
		<section className="py-24 md:py-32 px-4 relative z-10">
			<svg className="absolute h-0 w-0" aria-hidden>
				<defs>
					<filter
						id="letter-deckle"
						x="-3%"
						y="-3%"
						width="106%"
						height="106%"
						filterUnits="objectBoundingBox"
					>
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.035"
							numOctaves="3"
							seed="7"
							result="noise"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="noise"
							scale="5"
							xChannelSelector="R"
							yChannelSelector="G"
						/>
					</filter>
				</defs>
			</svg>

			<div className="container mx-auto max-w-3xl">
				<div className="relative px-8 py-16 sm:px-12 sm:py-20 md:px-16 md:py-24 text-center">
					<div className="letter-paper-face" aria-hidden />
					<div className="relative z-10 space-y-10">
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
