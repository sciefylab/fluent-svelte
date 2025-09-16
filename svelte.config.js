import path from "path";
import preprocess from "svelte-preprocess";
import vercel from "@sveltejs/adapter-vercel";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";
import prefixer from "postcss-variables-prefixer";
import a11yEmoji from "@fec/remark-a11y-emoji";

import slug from "rehype-slug";
import github from "remark-github";
import { componentExample } from "mdsvex-component-example";
import sveld from "vite-plugin-sveld";

import { mdsvex } from "mdsvex";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	extensions: [".svelte", ".md", ".svx"],
	preprocess: [
		mdsvex({
			extensions: [".svx", ".md"],
			layout: {
				example: "/src/site/lib/Example/Example.svelte"
			},
			remarkPlugins: [
				github, a11yEmoji, componentExample
			],
			rehypePlugins: [slug]
		}),
		preprocess({
			postcss: {
				plugins: [autoprefixer(), cssnano(), prefixer({ prefix: "fds-" })]
			}
		})
	],
	kit: {
		adapter: vercel(),
		vite: {
			plugins: [sveld()],
			resolve: {
				extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", "svg"],
				alias: {
					$site: path.resolve("src/site"),
					"fluent-svelte": path.resolve("src/lib")
				}
			}
		}
	}
};

export default config;
