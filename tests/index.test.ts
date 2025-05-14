import * as assert from "node:assert/strict";
import { it } from "node:test";
import { minify } from "../dist/index.js";

it("should minify", async () => {
	const result = await minify(
		`
out vec4 fragColor;
void main()
{
    fragColor = vec4(1., 1., 1., 1.);
}`,
		{ format: "text" },
	);
	assert.strictEqual(result, "out vec4 m;void main(){m=vec4(1);}");
});

it("should minify", async () => {
	const result = await minify(
		`
out vec4 fragColor;
void main()
{
    fragColor = vec4(1., 1., 1., 1.);
}`,
		{ format: "json" },
	);
	const json = JSON.parse(result);
	assert.deepEqual(json, {
		mappings: {
			fragColor: "m",
		},
		shaders: {
			glsl: "out vec4 m;void main(){m=vec4(1);}",
		},
	});
});
