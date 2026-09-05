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
 */
export function BirthdayExperience({ children }: BirthdayExperienceProps): JSX.Element {
	const [opened, setOpened] = useState(false);
	const [isShaking, setIsShaking] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!opened) {
			document.documentElement.removeAttribute("data-scroll-unlocked");
			window.scrollTo(0, 0);
			return;
		}
		document.documentElement.setAttribute("data-scroll-unlocked", "");
		return () => {
			document.documentElement.removeAttribute("data-scroll-unlocked");
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
		<div
			className={cn(
				"relative",
				opened ? "min-h-dvh" : "h-dvh overflow-hidden",
				isShaking && "animate-shake"
			)}
		>
			<AuroraBackground />
			<GiftGate opened={opened} onOpen={handleOpen} onShakeChange={setIsShaking} />
			{opened && <div ref={contentRef}>{children}</div>}
		</div>
	);
}
