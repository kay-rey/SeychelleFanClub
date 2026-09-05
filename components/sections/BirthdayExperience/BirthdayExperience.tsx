"use client";

import { useEffect, useState, type JSX, type ReactNode } from "react";
import { GiftGate } from "@/components/sections/GiftGate/GiftGate";

interface BirthdayExperienceProps {
	children: ReactNode;
}

/**
 * Incremental rebuild: Step 1 keeps the unlock shell but GiftGate is photo-only.
 * Open / scroll unlock is unused until later steps restore the full cover UI.
 */
export function BirthdayExperience({ children }: BirthdayExperienceProps): JSX.Element {
	const [opened, setOpened] = useState(false);

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

	return (
		<div className="relative">
			<GiftGate
				opened={opened}
				onOpen={() => {
					setOpened(true);
				}}
				onShakeChange={() => {}}
			/>
			{opened && <div>{children}</div>}
		</div>
	);
}
