/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						// svgoConfig: {
						//     plugins: {
						//         removeViewBox: false,
						//     },
						// },
					},
				},
			],
		});
		return config;
	},

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},

	logging: {
		fetches: {
			fullUrl: true,
		},
	},

	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},

	experimental: {
		typedRoutes: true,
	},

	reactStrictMode: true,
};

export default nextConfig;
