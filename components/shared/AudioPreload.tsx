"use client";

import { useEffect } from "react";
import { AUDIO_FILES } from "@/lib/constants";

/**
 * Client component that adds preload links for audio files to the document head.
 * This ensures audio files start downloading early for instant playback.
 */
export function AudioPreload(): null {
	useEffect(() => {
		const audioFiles = [...AUDIO_FILES];

		audioFiles.forEach((href) => {
			const link = document.createElement("link");
			link.rel = "preload";
			link.href = href;
			link.as = "audio";
			document.head.appendChild(link);
		});

		return () => {
			// Cleanup: remove preload links when component unmounts
			audioFiles.forEach((href) => {
				const existingLink = document.head.querySelector(
					`link[rel="preload"][href="${href}"]`
				);
				if (existingLink) {
					document.head.removeChild(existingLink);
				}
			});
		};
	}, []);

	return null;
}
