import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
	base: "./",
	plugins: [
		preact(),
		viteStaticCopy({
			targets: [
				{
					src: "node_modules/shader-minifier-wasm/dist/AppBundleSmall/_framework/*",
					dest: "assets",
				},
			],
		}),
	],
	worker: {
		format: "es",
	},
});
