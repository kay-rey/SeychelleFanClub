"use client";

import { useEffect, useRef, useState, type JSX, type ReactNode } from "react";
import { GiftGate } from "@/components/sections/GiftGate/GiftGate";
import { AuroraBackground } from "@/components/shared/AuroraBackground";
import { cn } from "@/lib/utils";
import { SCROLL_DELAY } from "@/lib/birthday";

interface BirthdayExperienceProps {
	children: ReactNode;
}

/**
 * Client island for the editorial unlock. Server-rendered sections are passed as children
 * and only mount in the DOM after the cover opens.
 *
 * Locked model: one in-flow cover at `100svh`. Scroll stays off via CSS (`html` overflow)
 * until Open — the cover never swaps fixed/relative, so the photo cannot jump or gap.
 */
export function BirthdayExperience({ children }: BirthdayExperienceProps): JSX.Element {
	const [opened, setOpened] = useState(false);
	const [isShaking, setIsShaking] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const html = document.documentElement;

		if (!opened) {
			html.removeAttribute("data-unlocked");
			window.scrollTo(0, 0);
			return;
		}

		html.setAttribute("data-unlocked", "");
		return () => {
			html.removeAttribute("data-unlocked");
		};
	}, [opened]);

	const handleOpen = (): void => {
		setOpened(true);
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				setTimeout(() => {
					contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
				}, SCROLL_DELAY);
			});
		});
	};

	return (
		<div className={cn("relative", isShaking && "animate-shake")}>
			<AuroraBackground />
			<GiftGate opened={opened} onOpen={handleOpen} onShakeChange={setIsShaking} />
			{opened && <div ref={contentRef}>{children}</div>}
		</div>
	);
}
