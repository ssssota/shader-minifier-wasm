import { type Options, minify } from "shader-minifier-wasm";

type Message = {
	id: string;
};
export type RequestMessage = Message & {
	type: "minify";
	source: Record<string, string>;
	options: Options;
};
export type ResponseMessage = MinifyResponse | MinifyError;
export type MinifyResponse = Message & {
	type: "minify";
	minified: string;
};
export type MinifyError = Message & {
	type: "error";
	error: string;
};

self.addEventListener("message", (event) => {
	const message: RequestMessage = event.data;

	switch (message.type) {
		case "minify":
			minify(message.source, message.options)
				.then(
					(minified) => {
						const response: ResponseMessage = {
							id: message.id,
							type: "minify",
							minified,
						};
						self.postMessage(response);
					},
					(error) => {
						const response: ResponseMessage = {
							id: message.id,
							type: "error",
							error: error instanceof Error ? error.message : String(error),
						};
						self.postMessage(response);
					},
				)
				.catch((error) => {
					console.error("Error during minification:", error);
				});
			break;
	}
});
