"use client";

import { useEffect, useState, type JSX } from "react";
import { CATALINA_WEEKEND, getDaysUntilCatalina } from "@/lib/birthday";

/**
 * Anticipation note for the birthday weekend on Catalina — known, not a surprise.
 * Shows whole days until Sunday, September 20 (Pacific).
 */
export function CatalinaWeekend(): JSX.Element {
	const { eyebrow, headline, body, detail } = CATALINA_WEEKEND;
	const [days, setDays] = useState<number | null>(null);

	useEffect(() => {
		setDays(getDaysUntilCatalina(new Date()));
	}, []);

	return (
		<section className="py-24 md:py-32 px-4 relative z-10">
			<div className="container mx-auto max-w-3xl text-center space-y-6 md:space-y-8">
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

				{days !== null && (
					<div
						className="pt-2 space-y-2"
						role="timer"
						aria-label={
							days === 0
								? "Catalina is today"
								: `${days} ${days === 1 ? "day" : "days"} until Catalina, Sunday September 20`
						}
					>
						<p className="font-serif text-5xl md:text-6xl tabular-nums text-primary leading-none">
							{days === 0 ? "Today" : days}
						</p>
						<p className="font-sans text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
							{days === 0
								? "Avalon is waiting"
								: days === 1
									? "day until Catalina"
									: "days until Catalina"}
						</p>
					</div>
				)}

				<p className="font-sans text-[0.7rem] uppercase tracking-[0.22em] text-primary/70 pt-2">
					{detail}
				</p>
			</div>
		</section>
	);
}
