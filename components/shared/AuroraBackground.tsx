import type { JSX } from "react";

/**
 * Quiet limestone paper wash — Getty Villa atmosphere without loud color.
 * Motion is CSS-only; it pauses when the user prefers reduced motion.
 */
export function AuroraBackground(): JSX.Element {
	return (
		<div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
			<div className="absolute inset-0 bg-[#f5f0e8]" />
			<div className="aurora-layer" />
		</div>
	);
}
