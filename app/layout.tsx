import type React from "react";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Great_Vibes } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { AudioPreload } from "@/components/shared/AudioPreload";
import { SHARE_IMAGE } from "@/lib/constants";
import "./globals.css";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#1c1812",
};

const greatVibes = Great_Vibes({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-great-vibes",
	display: "swap",
});

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	style: ["normal", "italic"],
	variable: "--font-cormorant",
	display: "swap",
});

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	variable: "--font-dm-sans",
	display: "swap",
});

const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.seychellereyes.com";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: "Happy birthday, Seychelle",
	description: "A birthday celebration page for Seychelle",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/favicon.ico",
	},
	openGraph: {
		title: "Happy birthday, Seychelle",
		description: "A birthday celebration page for Seychelle",
		type: "website",
		images: [
			{
				url: SHARE_IMAGE.src.src,
				width: SHARE_IMAGE.src.width,
				height: SHARE_IMAGE.src.height,
				alt: SHARE_IMAGE.alt,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Happy birthday, Seychelle",
		description: "A birthday celebration page for Seychelle",
		images: [SHARE_IMAGE.src.src],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): React.ReactElement {
	const criticalCss = [
		"html,body{margin:0;background:#1c1812;overflow:hidden}",
		"html[data-unlocked]{background:#f5f0e8;overflow-x:hidden;overflow-y:auto}",
		"html[data-unlocked] body{overflow:visible;background:inherit}",
		".gift-cover{position:relative;width:100%;height:100vh;height:100lvh;overflow:hidden}",
		".gift-cover-media{position:absolute;inset:0}",
		".gift-cover-media img{height:100%;width:100%;object-fit:cover;object-position:center}",
	].join("");

	return (
		<html lang="en">
			<head>
				<style dangerouslySetInnerHTML={{ __html: criticalCss }} />
			</head>
			<body
				className={`font-sans ${greatVibes.variable} ${cormorant.variable} ${dmSans.variable}`}
			>
				<AudioPreload />
				<Suspense fallback={null}>{children}</Suspense>
				<Analytics />
			</body>
		</html>
	);
}
