import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

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
	title: "Happy Birthday, Seychelle!",
	description: "A beautiful birthday celebration for Seychelle Reyes",
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
				<Suspense fallback={null}>{children}</Suspense>
				<Analytics />
			</body>
		</html>
	);
}
