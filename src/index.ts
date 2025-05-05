// @ts-ignore
import { minify as internal } from "./AppBundle/main.mjs";

/**
 * @see https://github.com/laurentlb/shader-minifier#usage
 */
export type Options = {
	/** Verbose, display additional information */
	verbose?: boolean;
	/** Debug, display more additional information */
	debug?: boolean;
	/** Use HLSL (default is GLSL) */
	hlsl?: boolean;
	/** Choose to format the output (use 'text' if you want just the shader) */
	format?:
		| "text"
		| "indented"
		| "c-variables"
		| "c-array"
		| "js"
		| "nasm"
		| "rust";
	/** Choose the field names for vectors: 'rgba', 'xyzw', or 'stpq' */
	fieldNames?: "rgba" | "xyzw" | "stpq";
	/** Do not rename external values (e.g. uniform) */
	preserveExternals?: boolean;
	/** Do not rename functions and global variables */
	preserveAllGlobals?: boolean;
	/** Do not automatically inline variables and functions */
	noInlining?: boolean;
	/** Aggressively inline constants. This can reduce output size due to better constant folding. It can also increase output size due to repeated inlined constants, but this increased redundancy can be beneficial to compression, leading to a smaller final compressed size anyway. Does nothing if inlining is disabled. */
	aggressiveInlining?: boolean;
	/** Do not rename anything */
	noRenaming?: boolean;
	/** Comma-separated list of functions to preserve */
	noRenamingList?: string | string[];
	/** Do not use the comma operator trick */
	noSequence?: boolean;
	/** Do not remove unused code */
	noRemoveUnused?: boolean;
	/** When renaming functions, do not introduce new overloads */
	noOverloading?: boolean;
	/** Move declarations to group them */
	moveDeclarations?: boolean;
	/** Evaluate some of the file preprocessor directives */
	preprocess?: boolean;
	/** Export kkpView symbol maps */
	exportKkpSymbolMaps?: boolean;
};

export function minify(source: string, options: Options = {}): Promise<string> {
	return internal(source, optionsIntoFlags(options));
}

function optionsIntoFlags(options: Options): string[] {
	const flags: string[] = [];
	if (options.verbose) flags.push("-v");
	if (options.debug) flags.push("--debug");
	if (options.hlsl) flags.push("--hlsl");
	if (options.format) flags.push("--format", options.format);
	if (options.fieldNames) flags.push("--field-names", options.fieldNames);
	if (options.preserveExternals) flags.push("--preserve-externals");
	if (options.preserveAllGlobals) flags.push("--preserve-all-globals");
	if (options.noInlining) flags.push("--no-inlining");
	if (options.aggressiveInlining) flags.push("--aggressive-inlining");
	if (options.noRenaming) flags.push("--no-renaming");
	if (options.noRenamingList) {
		flags.push(
			"--no-renaming-list",
			Array.isArray(options.noRenamingList)
				? options.noRenamingList.join(",")
				: options.noRenamingList,
		);
	}
	if (options.noSequence) flags.push("--no-sequence");
	if (options.noRemoveUnused) flags.push("--no-remove-unused");
	if (options.noOverloading) flags.push("--no-overloading");
	if (options.moveDeclarations) flags.push("--move-declarations");
	if (options.preprocess) flags.push("--preprocess");
	if (options.exportKkpSymbolMaps) flags.push("--export-kkp-symbol-maps");

	return flags;
}
