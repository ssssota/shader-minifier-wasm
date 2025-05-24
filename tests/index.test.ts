import * as assert from "node:assert/strict";
import { it } from "node:test";
import { minify } from "shader-minifier-wasm";

it("should minify", async () => {
	const result = await minify(
		{
			glsl: `
out vec4 fragColor;
void main()
{
    fragColor = vec4(1., 1., 1., 1.);
}`,
		},
		{ format: "text" },
	);
	assert.strictEqual(result, "out vec4 m;void main(){m=vec4(1);}");
});

it("should minify", async () => {
	const result = await minify(
		{
			vert: `
#version 330 core
in vec4 inPosition;
out vec4 outPosition;
void main()
{
		outPosition = inPosition;
}
`,
			frag: `
#version 330 core
in vec4 outPosition;
out vec4 fragColor;
void main()
{
		fragColor = outPosition;
}
`,
		},
		{ format: "json" },
	);
	const json = JSON.parse(result);
	assert.deepEqual(json, {
		mappings: { fragColor: "m", inPosition: "v", outPosition: "c" },
		shaders: {
			frag: "#version 330 core\nin vec4 c;out vec4 m;void main(){m=c;}",
			vert: "#version 330 core\nin vec4 v;out vec4 c;void main(){c=v;}",
		},
	});
});
