import type React from "react";
import type { Metadata, Viewport } from "next";
import { Corinthia, Playfair_Display, Poppins } from "next/font/google";
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

const corinthia = Corinthia({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-corinthia",
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
	title: "Happy birthday, Seychelle",
	description: "A birthday surprise for Seychelle",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/favicon.ico",
	},
	openGraph: {
		title: "Happy birthday, Seychelle",
		description: "A birthday surprise for Seychelle",
		type: "website",
		images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "Birthday surprise for Seychelle" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "Happy birthday, Seychelle",
		description: "A birthday surprise for Seychelle",
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
			<body className={`font-sans ${playfair.variable} ${corinthia.variable} ${poppins.variable}`}>
				<AudioPreload />
				<Suspense fallback={null}>{children}</Suspense>
				<Analytics />
			</body>
		</html>
	);
}
