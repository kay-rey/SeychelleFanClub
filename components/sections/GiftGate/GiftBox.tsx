"use client";

import type { JSX } from "react";
import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface GiftBoxProps {
	opened: boolean;
	ariaLabel: string;
	onOpen: () => void;
}

export function GiftBox({ opened, ariaLabel, onOpen }: GiftBoxProps): JSX.Element {
	return (
		<button
			type="button"
			onClick={onOpen}
			disabled={opened}
			aria-label={ariaLabel}
			className={cn(
				"gift-button relative flex flex-col items-center justify-end w-40 h-40 sm:w-44 sm:h-44 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 rounded-2xl",
				!opened && "animate-pulse-subtle",
				opened && "gift-open"
			)}
		>
			<div className="gift-lid" aria-hidden>
				<div className="gift-bow" />
			</div>
			<div className="gift-body">
				<div className="gift-ribbon-v" />
				<div className="gift-ribbon-h" />
				<Gift className="relative z-10 w-10 h-10 text-white drop-shadow-sm" />
			</div>
		</button>
	);
}
