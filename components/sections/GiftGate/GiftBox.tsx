"use client";

import type { JSX } from "react";
import { cn } from "@/lib/utils";

interface GiftBoxProps {
	opened: boolean;
	locked: boolean;
	wiggling: boolean;
	ariaLabel: string;
	onActivate: () => void;
}

/**
 * Illustrated gift box. Stays closed until birthday; the lid lifts after unwrap.
 */
export function GiftBox({
	opened,
	locked,
	wiggling,
	ariaLabel,
	onActivate,
}: GiftBoxProps): JSX.Element {
	return (
		<button
			type="button"
			onClick={onActivate}
			disabled={opened}
			aria-label={ariaLabel}
			aria-disabled={locked || opened}
			className={cn(
				"gift-scene relative w-[13.5rem] sm:w-[15.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/80 focus-visible:ring-offset-4 focus-visible:ring-offset-pink-50 rounded-3xl",
				wiggling && "gift-wiggle",
				opened && "gift-open",
				!opened && !locked && "gift-ready"
			)}
		>
			<svg
				viewBox="0 0 220 250"
				className="w-full h-auto drop-shadow-none"
				aria-hidden
			>
				<defs>
					<linearGradient id="gift-box-front" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#fbcfe8" />
						<stop offset="45%" stopColor="#f9a8d4" />
						<stop offset="100%" stopColor="#ec4899" />
					</linearGradient>
					<linearGradient id="gift-box-side" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor="#f472b6" />
						<stop offset="100%" stopColor="#be185d" />
					</linearGradient>
					<linearGradient id="gift-lid-front" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#fce7f3" />
						<stop offset="100%" stopColor="#f9a8d4" />
					</linearGradient>
					<linearGradient id="gift-lid-top" x1="0" y1="1" x2="0" y2="0">
						<stop offset="0%" stopColor="#fbcfe8" />
						<stop offset="100%" stopColor="#fff1f7" />
					</linearGradient>
					<linearGradient id="gift-lid-side" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor="#f9a8d4" />
						<stop offset="100%" stopColor="#db2777" />
					</linearGradient>
					<linearGradient id="gift-ribbon" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="#f6e27a" />
						<stop offset="40%" stopColor="#fde68a" />
						<stop offset="50%" stopColor="#fffbeb" />
						<stop offset="60%" stopColor="#fde68a" />
						<stop offset="100%" stopColor="#d4a017" />
					</linearGradient>
					<linearGradient id="gift-ribbon-v" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="#d4a017" />
						<stop offset="35%" stopColor="#fde68a" />
						<stop offset="50%" stopColor="#fffbeb" />
						<stop offset="65%" stopColor="#fde68a" />
						<stop offset="100%" stopColor="#b45309" />
					</linearGradient>
					<radialGradient id="gift-knot" cx="35%" cy="30%" r="70%">
						<stop offset="0%" stopColor="#fffbeb" />
						<stop offset="55%" stopColor="#facc15" />
						<stop offset="100%" stopColor="#ca8a04" />
					</radialGradient>
					<radialGradient id="gift-shadow" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="rgb(157 23 77 / 0.28)" />
						<stop offset="100%" stopColor="rgb(157 23 77 / 0)" />
					</radialGradient>
					<linearGradient id="gift-sheen" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="rgb(255 255 255 / 0)" />
						<stop offset="45%" stopColor="rgb(255 255 255 / 0.28)" />
						<stop offset="100%" stopColor="rgb(255 255 255 / 0)" />
					</linearGradient>
				</defs>

				<ellipse cx="110" cy="232" rx="62" ry="9" fill="url(#gift-shadow)" />

				<g className="gift-body-group">
					<path d="M166 104 L184 90 L184 188 L166 208 Z" fill="url(#gift-box-side)" />
					<rect x="36" y="104" width="130" height="104" rx="8" fill="url(#gift-box-front)" />
					<rect x="36" y="104" width="130" height="104" rx="8" fill="url(#gift-sheen)" opacity="0.35" />
					<rect x="97" y="104" width="14" height="104" fill="url(#gift-ribbon-v)" />
					<rect x="36" y="148" width="130" height="14" fill="url(#gift-ribbon)" />
					<rect x="166" y="148" width="18" height="12" fill="#d4a017" opacity="0.85" />
				</g>

				<g className="gift-lid-group">
					<path d="M28 86 L50 68 L192 68 L166 86 Z" fill="url(#gift-lid-top)" />
					<path d="M166 86 L192 68 L192 92 L166 110 Z" fill="url(#gift-lid-side)" />
					<rect x="28" y="86" width="138" height="26" rx="5" fill="url(#gift-lid-front)" />
					<rect x="97" y="68" width="14" height="44" fill="url(#gift-ribbon-v)" />

					<ellipse
						cx="82"
						cy="52"
						rx="24"
						ry="15"
						transform="rotate(-28 82 52)"
						fill="url(#gift-ribbon)"
					/>
					<ellipse
						cx="138"
						cy="52"
						rx="24"
						ry="15"
						transform="rotate(28 138 52)"
						fill="url(#gift-ribbon)"
					/>
					<ellipse
						cx="82"
						cy="52"
						rx="16"
						ry="9"
						transform="rotate(-28 82 52)"
						fill="#fffbeb"
						opacity="0.35"
					/>
					<ellipse
						cx="138"
						cy="52"
						rx="16"
						ry="9"
						transform="rotate(28 138 52)"
						fill="#fffbeb"
						opacity="0.35"
					/>
					<path
						d="M104 62 Q92 92 78 108"
						fill="none"
						stroke="url(#gift-ribbon)"
						strokeWidth="9"
						strokeLinecap="round"
					/>
					<path
						d="M116 62 Q128 92 142 108"
						fill="none"
						stroke="url(#gift-ribbon)"
						strokeWidth="9"
						strokeLinecap="round"
					/>
					<circle cx="110" cy="56" r="11" fill="url(#gift-knot)" />
					<circle cx="106" cy="52" r="3.5" fill="#fffbeb" opacity="0.7" />
				</g>
			</svg>
		</button>
	);
}
