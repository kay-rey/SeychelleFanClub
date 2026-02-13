/** @type {import('next').NextConfig} */
const nextConfig = {
	// Optimize for Vercel deployment
	images: {
		formats: ["image/webp", "image/avif"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
	// Enable static optimization
	experimental: {
		optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
	},
	// Performance optimizations
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	// Cache control headers with stale-while-revalidate for optimal performance
	// Content is fresh for 1 hour, then serves stale content while revalidating in background for up to 24 hours
	// Next.js automatically handles ETags for version checking
	async headers() {
		return [
			{
				source: "/",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=3600, stale-while-revalidate=86400",
					},
				],
			},
		];
	},
};

export default nextConfig;
