import { useSignal, useSignalEffect } from "@preact/signals";
import type { Options } from "shader-minifier-wasm";
import { minify } from "./minifier";
import sample from "./sample.glsl?raw";

const onSubmit = (e: Event) => {
	e.preventDefault();
};

export function App() {
	const source = useSignal(sample);
	const result = useSignal("");
	const options = useSignal<Options>({
		/** Use HLSL (default is GLSL) */
		hlsl: false,
		/** Choose to format the output (use 'text' if you want just the shader) */
		format: "js", // "text" | "indented" | "c-variables" | "c-array" | "js" | "nasm" | "rust";
		/** Choose the field names for vectors: 'rgba', 'xyzw', or 'stpq' */
		fieldNames: "xyzw", // "rgba" | "xyzw" | "stpq";
		/** Do not rename external values (e.g. uniform) */
		preserveExternals: false,
		/** Do not rename functions and global variables */
		preserveAllGlobals: false,
		/** Do not automatically inline variables and functions */
		noInlining: false,
		/** Aggressively inline constants. This can reduce output size due to better constant folding. It can also increase output size due to repeated inlined constants, but this increased redundancy can be beneficial to compression, leading to a smaller final compressed size anyway. Does nothing if inlining is disabled. */
		aggressiveInlining: false,
		/** Do not rename anything */
		noRenaming: false,
		/** Comma-separated list of functions to preserve */
		noRenamingList: ["main", "mainImage"], // string | string[];
		/** Do not use the comma operator trick */
		noSequence: false,
		/** Do not remove unused code */
		noRemoveUnused: false,
		/** When renaming functions, do not introduce new overloads */
		noOverloading: false,
		/** Move declarations to group them */
		moveDeclarations: false,
		/** Evaluate some of the file preprocessor directives */
		preprocess: false,
		/** Export kkpView symbol maps */
		exportKkpSymbolMaps: false,
	});
	const duration = useSignal<number | undefined>();

	useSignalEffect(() => {
		const start = performance.now();
		minify(source.value, options.value).then((minified) => {
			const end = performance.now();
			duration.value = end - start;
			result.value = minified;
		});
	});

	return (
		<>
			<h1>shader-minifier-wasm</h1>
			<form onSubmit={onSubmit}>
				<label for="shader-source">Shader source</label>
				<textarea
					id="shader-source"
					placeholder={sample}
					value={source.value}
					onInput={(e) => {
						source.value = e.currentTarget.value;
					}}
					style={{ fontFamily: "monospace" }}
				/>
				<fieldset>
					<legend>Options</legend>
					<p>
						<label for="hlsl">
							<input
								type="checkbox"
								id="hlsl"
								checked={options.value.hlsl}
								onChange={(e) => {
									options.value = {
										...options.value,
										hlsl: e.currentTarget.checked,
									};
								}}
							/>
							HLSL
						</label>
					</p>
					<p>
						<label for="format">Format</label>
						<select
							id="format"
							value={options.value.format}
							onChange={(e) => {
								options.value = {
									...options.value,
									format: e.currentTarget.value as Options["format"],
								};
							}}
						>
							<option value="text">text</option>
							<option value="indented">indented</option>
							<option value="c-variables">c-variables</option>
							<option value="c-array">c-array</option>
							<option value="js">js</option>
							<option value="nasm">nasm</option>
							<option value="rust">rust</option>
						</select>
					</p>
				</fieldset>
				<fieldset>
					<legend>Field names</legend>
					<p>
						<label for="field-names">Field names</label>
						<select
							id="field-names"
							value={options.value.fieldNames}
							onChange={(e) => {
								options.value = {
									...options.value,
									fieldNames: e.currentTarget.value as Options["fieldNames"],
								};
							}}
						>
							<option value="rgba">rgba</option>
							<option value="xyzw">xyzw</option>
							<option value="stpq">stpq</option>
						</select>
					</p>
				</fieldset>
				<p>
					<label for="preserve-externals">
						<input
							type="checkbox"
							id="preserve-externals"
							checked={options.value.preserveExternals}
							onChange={(e) => {
								options.value = {
									...options.value,
									preserveExternals: e.currentTarget.checked,
								};
							}}
						/>
						Preserve externals
					</label>
				</p>
				<p>
					<label for="preserve-all-globals">
						<input
							type="checkbox"
							id="preserve-all-globals"
							checked={options.value.preserveAllGlobals}
							onChange={(e) => {
								options.value = {
									...options.value,
									preserveAllGlobals: e.currentTarget.checked,
								};
							}}
						/>
						Preserve all globals
					</label>
				</p>
				<p>
					<label for="no-inlining">
						<input
							type="checkbox"
							id="no-inlining"
							checked={options.value.noInlining}
							onChange={(e) => {
								options.value = {
									...options.value,
									noInlining: e.currentTarget.checked,
								};
							}}
						/>
						No inlining
					</label>
				</p>
				<p>
					<label for="aggressive-inlining">
						<input
							type="checkbox"
							id="aggressive-inlining"
							checked={options.value.aggressiveInlining}
							onChange={(e) => {
								options.value = {
									...options.value,
									aggressiveInlining: e.currentTarget.checked,
								};
							}}
						/>
						Aggressive inlining
					</label>
				</p>
				<p>
					<label for="no-renaming">
						<input
							type="checkbox"
							id="no-renaming"
							checked={options.value.noRenaming}
							onChange={(e) => {
								options.value = {
									...options.value,
									noRenaming: e.currentTarget.checked,
								};
							}}
						/>
						No renaming
					</label>
				</p>
				<p>
					<label for="no-renaming-list">
						<input
							type="text"
							id="no-renaming-list"
							placeholder="foo, bar"
							value={
								Array.isArray(options.value.noRenamingList)
									? options.value.noRenamingList.join(", ")
									: ""
							}
							onInput={(e) => {
								options.value = {
									...options.value,
									noRenamingList: e.currentTarget.value
										.split(",")
										.map((s) => s.trim())
										.filter((s) => s.length > 0),
								};
							}}
						/>
						No renaming list
					</label>
				</p>
				<p>
					<label for="no-sequence">
						<input
							type="checkbox"
							id="no-sequence"
							checked={options.value.noSequence}
							onChange={(e) => {
								options.value = {
									...options.value,
									noSequence: e.currentTarget.checked,
								};
							}}
						/>
						No sequence
					</label>
				</p>
				<p>
					<label for="no-remove-unused">
						<input
							type="checkbox"
							id="no-remove-unused"
							checked={options.value.noRemoveUnused}
							onChange={(e) => {
								options.value = {
									...options.value,
									noRemoveUnused: e.currentTarget.checked,
								};
							}}
						/>
						No remove unused
					</label>
				</p>
				<p>
					<label for="no-overloading">
						<input
							type="checkbox"
							id="no-overloading"
							checked={options.value.noOverloading}
							onChange={(e) => {
								options.value = {
									...options.value,
									noOverloading: e.currentTarget.checked,
								};
							}}
						/>
						No overloading
					</label>
				</p>
				<p>
					<label for="move-declarations">
						<input
							type="checkbox"
							id="move-declarations"
							checked={options.value.moveDeclarations}
							onChange={(e) => {
								options.value = {
									...options.value,
									moveDeclarations: e.currentTarget.checked,
								};
							}}
						/>
						Move declarations
					</label>
				</p>
			</form>
			<output>
				{duration.value && <p>Minified in {duration.value.toFixed(2)}ms</p>}
				<pre>
					<code>{result.value}</code>
				</pre>
			</output>
		</>
	);
}
