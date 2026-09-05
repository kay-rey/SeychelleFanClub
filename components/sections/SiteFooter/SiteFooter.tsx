"use client";

import { useState, type CSSProperties, type JSX } from "react";
import { Heart, Shell } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONFETTI_DURATION, getUnlockFanfarePieces } from "@/lib/birthday";

const FOOTER_MARKS = getUnlockFanfarePieces().slice(0, 24);

/**
 * Closing credit — tap for a quiet gold burst instead of leaving the page.
 */
export function SiteFooter(): JSX.Element {
	const [burstKey, setBurstKey] = useState(0);
	const [showBurst, setShowBurst] = useState(false);

	const handleCelebrate = (): void => {
		setBurstKey((key) => key + 1);
		setShowBurst(true);
		if (typeof navigator !== "undefined" && navigator.vibrate) {
			try {
				navigator.vibrate([30, 40, 50]);
			} catch {
				// ignore unsupported vibration
			}
		}
		window.setTimeout(() => {
			setShowBurst(false);
		}, CONFETTI_DURATION + 800);
	};

	return (
		<footer className="py-12 px-4 relative z-10 border-t border-border/60 overflow-hidden">
			{showBurst && (
				<div
					key={burstKey}
					className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
					aria-hidden
				>
					{FOOTER_MARKS.map(({ id, tx, ty, size = 8, delayMs = 0, tone = "gold" }) => (
						<div
							key={`footer-mark-${burstKey}-${id}`}
							className={cn("unlock-mark", `unlock-mark-tone-${tone}`)}
							style={
								{
									width: size,
									height: size,
									animationDelay: `${delayMs}ms`,
									"--tx": `${tx * 0.55}px`,
									"--ty": `${ty * 0.45}px`,
									"--spin": `${(id % 2 === 0 ? 1 : -1) * (70 + (id % 5) * 24)}deg`,
								} as CSSProperties
							}
						/>
					))}
				</div>
			)}

			<div className="container mx-auto text-center relative z-10">
				<button
					type="button"
					onClick={handleCelebrate}
					aria-label="Made with love for Seychelle. Tap for a little celebration."
					className="inline-flex items-center justify-center gap-1.5 font-sans text-sm text-muted-foreground tracking-wide hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm px-2 py-1"
				>
					<span>Made with</span>
					<Heart
						className="h-3.5 w-3.5 fill-current text-primary/80"
						aria-hidden
					/>
					<span>for</span>
					<Shell className="h-3.5 w-3.5 text-primary/80" aria-hidden />
					<span className="sr-only">Seychelle</span>
				</button>
			</div>
		</footer>
	);
}
