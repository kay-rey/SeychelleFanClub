import type { JSX } from "react";
import { Heart, Shell } from "lucide-react";

export function SiteFooter(): JSX.Element {
	return (
		<footer className="py-12 px-4 relative z-10 border-t border-border/60">
			<div className="container mx-auto text-center">
				<p className="font-sans text-sm text-muted-foreground tracking-wide">
					<a
						href="https://github.com/kay-rey"
						className="inline-flex items-center justify-center gap-1.5 hover:text-primary transition-colors"
					>
						<span>Made with</span>
						<Heart
							className="h-3.5 w-3.5 fill-current text-primary/80"
							aria-label="love"
						/>
						<span>for</span>
						<Shell className="h-3.5 w-3.5 text-primary/80" aria-label="Seychelle" />
						<span className="sr-only">Seychelle</span>
					</a>
				</p>
			</div>
		</footer>
	);
}
