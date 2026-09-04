import type { JSX } from "react";

export function SiteFooter(): JSX.Element {
	return (
		<footer className="py-12 px-4 relative z-10 border-t border-border/60">
			<div className="container mx-auto text-center">
				<p className="font-sans text-sm text-muted-foreground tracking-wide">
					<a href="https://github.com/kay-rey" className="hover:text-primary transition-colors">
						Made with love for Seychelle
					</a>
				</p>
			</div>
		</footer>
	);
}
