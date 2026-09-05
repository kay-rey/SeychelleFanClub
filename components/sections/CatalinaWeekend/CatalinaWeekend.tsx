import type { JSX } from "react";
import { CATALINA_WEEKEND } from "@/lib/birthday";

/**
 * Anticipation note for the birthday weekend on Catalina — known, not a surprise.
 */
export function CatalinaWeekend(): JSX.Element {
	const { eyebrow, headline, body, detail } = CATALINA_WEEKEND;

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
					<div className="relative space-y-6 md:space-y-8">
						<p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
							{eyebrow}
						</p>
						<div className="mx-auto h-px w-12 bg-border" aria-hidden />
						<h2 className="font-serif text-4xl md:text-5xl text-primary text-balance">
							{headline}
						</h2>
						<p className="font-serif italic text-lg md:text-xl text-muted-foreground text-balance max-w-xl mx-auto leading-relaxed">
							{body}
						</p>
						<p className="font-sans text-[0.7rem] uppercase tracking-[0.22em] text-primary/70 pt-2">
							{detail}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
