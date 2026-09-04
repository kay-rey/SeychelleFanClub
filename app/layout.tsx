import type React from "react";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { AudioPreload } from "@/components/shared/AudioPreload";
import { COVER_IMAGE } from "@/lib/constants";
import "./globals.css";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
	themeColor: "#f5f0e8",
};

const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-playfair",
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
	description: "An editorial birthday feature for Seychelle",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/favicon.ico",
	},
	openGraph: {
		title: "Happy birthday, Seychelle",
		description: "An editorial birthday feature for Seychelle",
		type: "website",
		images: [
			{
				url: COVER_IMAGE.src.src,
				width: COVER_IMAGE.src.width,
				height: COVER_IMAGE.src.height,
				alt: "Birthday feature for Seychelle",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Happy birthday, Seychelle",
		description: "An editorial birthday feature for Seychelle",
		images: [COVER_IMAGE.src.src],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`font-sans ${playfair.variable} ${dmSans.variable}`}>
				<AudioPreload />
				<Suspense fallback={null}>{children}</Suspense>
				<Analytics />
			</body>
		</html>
	);
}
