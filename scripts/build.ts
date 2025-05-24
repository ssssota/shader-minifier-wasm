import { type StdioOptions, spawn } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";

main();
async function main() {
	await clean();
	await buildWasm(false);
	await copyDir(
		"./Wasm/bin/Release/net8.0/browser-wasm/AppBundle",
		"./dist/AppBundle",
	);
	await buildTs();
}

async function clean() {
	await fs.rm("dist", { recursive: true, force: true });
	await fs.rm("Wasm/bin", { recursive: true, force: true });
}
async function buildWasm(aot: boolean) {
	await exec("dotnet", "publish ./Wasm/wasm.csproj -c Release".split(" "));
}
async function buildTs() {
	await exec("./node_modules/.bin/tsc", []);
}

async function exec(file: string, args: string[]) {
	console.log(`> ${file} ${args.join(" ")}`);
	const stdio = ["inherit", "ignore", "inherit"] satisfies StdioOptions;
	return new Promise<void>((resolve, reject) => {
		const child = spawn(file, args, { stdio });
		child.on("close", (code) => {
			if (code !== 0) {
				reject(new Error(`Process exited with code ${code}`));
			} else {
				resolve();
			}
		});
	});
}

async function copyFile(src: string, dist: string, log = true) {
	if (log) console.log(`> cp ${src} ${dist}`);
	await fs.mkdir(path.dirname(dist), { recursive: true });
	await fs.copyFile(src, dist);
}
async function copyDir(src: string, dist: string, log = true) {
	if (log) console.log(`> cp -r ${src} ${dist}`);
	await fs.mkdir(dist, { recursive: true });
	const entries = await fs.readdir(src, { withFileTypes: true });
	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const distPath = path.join(dist, entry.name);
		if (entry.isDirectory()) {
			await copyDir(srcPath, distPath, false);
		} else {
			await copyFile(srcPath, distPath, false);
		}
	}
}
