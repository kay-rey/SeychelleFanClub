"use client";

import { useEffect, useRef, useState, type JSX, type ReactNode } from "react";
import { GiftGate } from "@/components/sections/GiftGate/GiftGate";
import { cn } from "@/lib/utils";
import { SCROLL_DELAY } from "@/lib/birthday";

interface BirthdayExperienceProps {
	children: ReactNode;
}

/**
 * Client island for the editorial unlock. Server-rendered sections are passed as children
 * and only mount after Open.
 *
 * Locked: document cannot scroll (CSS on `html`). Cover is a normal in-flow
 * block with a JS-locked pixel height so mobile chrome cannot resize it.
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
		// Unlock scroll immediately (don't wait for useEffect) so the page can move.
		document.documentElement.setAttribute("data-unlocked", "");
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
			<GiftGate opened={opened} onOpen={handleOpen} onShakeChange={setIsShaking} />
			{opened && <div ref={contentRef}>{children}</div>}
		</div>
	);
}
