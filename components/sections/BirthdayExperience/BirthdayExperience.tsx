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
 * Client island for the gift unwrap. Server-rendered sections are passed as children
 * and only mount in the DOM after the gift opens.
 */
export function BirthdayExperience({ children }: BirthdayExperienceProps): JSX.Element {
	const [opened, setOpened] = useState(false);
	const [isShaking, setIsShaking] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!opened) {
			document.documentElement.style.overflow = "hidden";
			document.body.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";
		}
		return () => {
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";
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
		<div className={cn("min-h-screen relative", isShaking && "animate-shake")}>
			<AuroraBackground />
			<GiftGate opened={opened} onOpen={handleOpen} onShakeChange={setIsShaking} />
			{opened && <div ref={contentRef}>{children}</div>}
		</div>
	);
}
