"use client";

import { useEffect, useRef, useState, type JSX, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
	children: ReactNode;
	className?: string;
	/** Extra delay after the element enters view, in ms. */
	delayMs?: number;
}

/**
 * Soft fade/slide-up when the block enters the viewport.
 * Honors prefers-reduced-motion via CSS.
 */
export function RevealOnScroll({
	children,
	className,
	delayMs = 0,
}: RevealOnScrollProps): JSX.Element {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;
				setIsVisible(true);
				observer.disconnect();
			},
			{
				threshold: 0.12,
				rootMargin: "0px 0px -6% 0px",
			}
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={cn("reveal-on-scroll", isVisible && "is-visible", className)}
			style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
		>
			{children}
		</div>
	);
}
