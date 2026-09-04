import type { JSX } from "react";

export function SiteFooter(): JSX.Element {
	return (
		<footer className="py-8 px-4 relative z-10">
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/20 to-pink-50/40" />
			<div className="container mx-auto text-center space-y-2">
				<p className="text-muted-foreground">
					<a href="https://github.com/kay-rey">Made with love for 🐚 by 🐨.</a>
				</p>
			</div>
		</footer>
	);
}
