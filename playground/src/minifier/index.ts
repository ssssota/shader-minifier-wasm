import type { minify as internal } from "shader-minifier-wasm";
import type { RequestMessage, ResponseMessage } from "./worker";
import MinifyWorker from "./worker?worker";

const worker = new MinifyWorker();

export const minify: typeof internal = async (source, options = {}) => {
	const id = globalThis.crypto.randomUUID();
	return new Promise((resolve, reject) => {
		const onmessage = (event: MessageEvent<ResponseMessage>) => {
			const message = event.data;
			if (message.id !== id) return;
			switch (message.type) {
				case "minify":
					resolve(message.minified);
					break;
				case "error":
					reject(new Error(message.error));
			}
			worker.removeEventListener("message", onmessage);
		};
		worker.addEventListener("message", onmessage);
		worker.postMessage({
			id,
			type: "minify",
			source,
			options,
		} satisfies RequestMessage);
	});
};
