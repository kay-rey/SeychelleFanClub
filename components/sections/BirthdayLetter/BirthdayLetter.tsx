import type { JSX } from "react";
import { Heart, Shell } from "lucide-react";
import { LETTER_BODY, LETTER_GREETING, LETTER_SIGN_OFF } from "@/lib/birthday";

export function BirthdayLetter(): JSX.Element {
	return (
		<section className="py-20 px-4 relative z-10">
			<div className="container mx-auto max-w-4xl text-center">
				<div className="space-y-8">
					<p className="font-serif text-4xl md:text-5xl lg:text-6xl text-pink-600 font-bold">
						{LETTER_GREETING}
					</p>
					<blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary leading-relaxed text-balance">
						{LETTER_BODY}
					</blockquote>
					<p className="font-serif text-xl text-primary">{LETTER_SIGN_OFF}</p>
					<div className="flex justify-center gap-4 pt-8">
						<Heart className="w-8 h-8 text-pink-400 float" />
						<Shell className="w-8 h-8 text-primary float" style={{ animationDelay: "0.5s" }} />
						<Heart className="w-8 h-8 text-pink-400 float" style={{ animationDelay: "1s" }} />
					</div>
				</div>
			</div>
		</section>
	);
}
