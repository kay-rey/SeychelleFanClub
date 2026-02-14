import type React from "react";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { AudioPreload } from "@/components/shared/AudioPreload";
import "./globals.css";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
	themeColor: "#fce7f3",
};

const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-playfair",
	display: "swap",
});

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	variable: "--font-poppins",
	display: "swap",
});

const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.seychellereyes.com";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: "Will you be my valentine?",
	description: "A special Valentine's Day surprise for Seychelle",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/favicon.ico",
	},
	openGraph: {
		title: "Will you be my valentine?",
		description: "A special Valentine's Day surprise for Seychelle",
		type: "website",
		images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "Valentine's Day surprise" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "Will you be my valentine?",
		description: "A special Valentine's Day surprise for Seychelle",
		images: ["/images/hero.jpg"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`font-sans ${playfair.variable} ${poppins.variable}`}>
				<AudioPreload />
				<Suspense fallback={null}>{children}</Suspense>
				<Analytics />
			</body>
		</html>
	);
}
