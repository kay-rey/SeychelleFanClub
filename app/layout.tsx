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

export const metadata: Metadata = {
	title: "Will you be my valentine?",
	description: "A special Valentine's Day surprise for Seychelle",
	generator: "v0.app",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/favicon.ico",
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
