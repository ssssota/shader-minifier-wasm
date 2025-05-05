import { useState } from "preact/hooks";
import { minify } from "shader-minifier-wasm";
import sample from "./sample.glsl?raw";

export function App() {
	const [source, setSource] = useState(sample);
	const [minified, setMinified] = useState("");

	return (
		<>
			<textarea
				value={source}
				onInput={(e) => {
					setSource(e.currentTarget.value);
					minify(e.currentTarget.value, { format: "text" }).then(setMinified);
				}}
			/>
			<output>
				<pre>
					<code>{minified}</code>
				</pre>
			</output>
		</>
	);
}
