import { useEffect, useState } from "preact/hooks";
import { minify } from "shader-minifier-wasm";
import sample from "./sample.glsl?raw";

export function App() {
	const [source, setSource] = useState(sample);
	const [minified, setMinified] = useState("");

	useEffect(() => {
		minify(source, { format: "text" }).then(setMinified);
	}, [source]);

	return (
		<>
			<h1>shader-minifier-wasm</h1>
			<textarea
				value={source}
				onInput={(e) => setSource(e.currentTarget.value)}
			/>
			<output>
				<pre>
					<code>{minified}</code>
				</pre>
			</output>
		</>
	);
}
