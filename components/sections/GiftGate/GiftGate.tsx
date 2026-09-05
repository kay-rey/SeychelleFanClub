"use client";

import { useEffect, useRef, useState, type JSX } from "react";
import Image from "next/image";
import { COVER_IMAGE } from "@/lib/constants";

interface GiftGateProps {
	opened: boolean;
	onOpen: () => void;
	onShakeChange: (isShaking: boolean) => void;
}

/**
 * STEP 1 (incremental hero rebuild): photo only.
 * No scrim, text, mute, countdown, confetti, or JS height lock.
 * Debug meter stays so we can confirm fill on Vercel/Chrome iOS.
 */
export function GiftGate(_props: GiftGateProps): JSX.Element {
	const coverRef = useRef<HTMLElement | null>(null);
	const [debugText, setDebugText] = useState<string | null>(null);
	const [debugJson, setDebugJson] = useState<string | null>(null);
	const [copyStatus, setCopyStatus] = useState<string | null>(null);
	const logsRef = useRef<unknown[]>([]);

	useEffect(() => {
		document.documentElement.style.removeProperty("--gift-cover-height");

		const showOverlay =
			typeof window !== "undefined" &&
			(new URLSearchParams(window.location.search).has("coverdebug") ||
				window.location.hostname.endsWith(".vercel.app") ||
				window.location.hostname === "localhost" ||
				/^(\d{1,3}\.){3}\d{1,3}$/.test(window.location.hostname));

		const probe = (unit: string): number => {
			const el = document.createElement("div");
			el.style.cssText = `position:absolute;left:0;top:0;height:${unit};width:1px;visibility:hidden;pointer-events:none;`;
			document.documentElement.appendChild(el);
			const h = el.getBoundingClientRect().height;
			el.remove();
			return Math.round(h);
		};

		const measure = (phase: string): void => {
			// #region agent log
			const cover = coverRef.current;
			const media = cover?.querySelector(".gift-cover-media") as HTMLElement | null;
			const img = cover?.querySelector("img") as HTMLImageElement | null;
			const rect = cover?.getBoundingClientRect();
			const mediaRect = media?.getBoundingClientRect();
			const imgRect = img?.getBoundingClientRect();
			const vv = window.visualViewport;
			const coverH = cover?.offsetHeight ?? null;
			const gap = coverH == null ? null : Math.round(window.innerHeight - coverH);
			const units = {
				vh: probe("100vh"),
				svh: probe("100svh"),
				lvh: probe("100lvh"),
				dvh: probe("100dvh"),
			};
			const payload = {
				sessionId: "fac517",
				runId: "step1-photo-lvh",
				hypothesisId: "baseline",
				location: "GiftGate.tsx:step1",
				message: phase,
				data: {
					step: 1,
					innerHeight: window.innerHeight,
					clientHeight: document.documentElement.clientHeight,
					visualViewportHeight: vv?.height ?? null,
					visualViewportOffsetTop: vv?.offsetTop ?? null,
					screenHeight: window.screen.height,
					coverH,
					coverTop: rect ? Math.round(rect.top) : null,
					coverBottom: rect ? Math.round(rect.bottom) : null,
					mediaH: mediaRect ? Math.round(mediaRect.height) : null,
					imgH: imgRect ? Math.round(imgRect.height) : null,
					gapBelowInner: gap,
					units,
					computedHeight: cover ? getComputedStyle(cover).height : null,
					computedPosition: cover ? getComputedStyle(cover).position : null,
					href: window.location.href,
					userAgent: navigator.userAgent,
				},
				timestamp: Date.now(),
			};
			logsRef.current = [...logsRef.current.slice(-19), payload];
			(
				window as Window & { __COVER_DEBUG_LOGS__?: unknown[] }
			).__COVER_DEBUG_LOGS__ = logsRef.current;
			if (showOverlay) {
				setDebugJson(JSON.stringify(logsRef.current, null, 2));
				setDebugText(
					[
						"STEP 1 — photo @ 100lvh",
						phase,
						`cover=${coverH}`,
						`media=${mediaRect ? Math.round(mediaRect.height) : "?"}`,
						`inner=${window.innerHeight}`,
						`vv=${vv?.height ?? "?"}`,
						`gap=${gap}`,
						`svh=${units.svh} lvh=${units.lvh} vh=${units.vh} dvh=${units.dvh}`,
					].join("\n")
				);
			}
			fetch("http://127.0.0.1:7423/ingest/6cfae7e9-b629-4446-9ba8-9082917ca3b9", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Debug-Session-Id": "fac517",
				},
				body: JSON.stringify(payload),
			}).catch(() => {});
			// #endregion
		};

		measure("mount");
		const ids = [50, 200, 500, 1500].map((ms) =>
			window.setTimeout(() => measure(`settled-${ms}ms`), ms)
		);
		const onVv = (): void => {
			measure("visualViewport-resize");
		};
		window.visualViewport?.addEventListener("resize", onVv);
		return () => {
			window.visualViewport?.removeEventListener("resize", onVv);
			ids.forEach((id) => window.clearTimeout(id));
		};
	}, []);

	const copyDebug = async (): Promise<void> => {
		if (!debugJson) return;
		try {
			await navigator.clipboard.writeText(debugJson);
			setCopyStatus("Copied — paste into chat");
		} catch {
			setCopyStatus("Copy failed — long-press select");
		}
		window.setTimeout(() => setCopyStatus(null), 2500);
	};

	return (
		<>
			{debugText && (
				<div className="fixed left-2 right-2 top-1/2 z-[100] -translate-y-1/2 rounded bg-black/90 p-2 text-[#f5f0e8]">
					<pre className="max-h-40 overflow-auto text-[10px] leading-snug whitespace-pre-wrap">
						{debugText}
					</pre>
					<button
						type="button"
						onClick={() => {
							void copyDebug();
						}}
						className="mt-2 w-full rounded bg-[#f5f0e8] px-3 py-2 text-center text-xs font-medium text-[#1c1812]"
					>
						{copyStatus ?? "Copy debug report (paste into chat)"}
					</button>
				</div>
			)}

			<section ref={coverRef} className="gift-cover" aria-label="Cover photo">
				<div className="gift-cover-media">
					<Image
						src={COVER_IMAGE.src}
						alt={COVER_IMAGE.alt}
						fill
						priority
						placeholder="blur"
						sizes="100vw"
						className="object-cover object-center"
					/>
				</div>
			</section>
		</>
	);
}
