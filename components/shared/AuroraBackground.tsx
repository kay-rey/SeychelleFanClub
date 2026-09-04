import type { JSX } from "react";

/**
 * Site-wide aurora wash in blush, rose, and champagne gold.
 * Motion is CSS-only; it pauses when the user prefers reduced motion.
 */
export function AuroraBackground(): JSX.Element {
	return (
		<div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
			<div className="absolute inset-0 bg-[#fff7ed]" />
			<div className="aurora-layer" />
		</div>
	);
}
