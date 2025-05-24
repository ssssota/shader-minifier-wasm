// @ts-ignore
import { createMinifier as internal } from "./AppBundle/main.mjs";

/**
 * @see https://github.com/laurentlb/shader-minifier#usage
 */
export type Options = {
	/** Set the output filename (default is shader_code.h) */
	outputName?: string;
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
		| "rust"
		| "json";
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

export async function createMinifier(): Promise<
	(sources: Record<string, string>, options?: Options) => string
> {
	const minifier = await internal();
	return (sources: Record<string, string>, options: Options = {}) => {
		// [JSExport]
		// internal static string Minify(
		//   string[] sources,
		//   bool version,
		//   string outputName,
		//   string outputFormat,
		//   bool verbose,
		//   bool debug,
		//   string canonicalFieldNames,
		//   bool preserveExternals,
		//   bool preserveAllGlobals,
		//   bool hlsl,
		//   bool noInlining,
		//   bool noOverloading,
		//   bool aggroInlining,
		//   bool noSequence,
		//   bool noRenaming,
		//   string[] noRenamingList,
		//   bool noRemoveUnused,
		//   bool moveDeclarations,
		//   bool preprocess,
		//   bool exportKkpSymbolMaps
		// )
		return minifier(
			Object.entries(sources).flat(),
			false, // version
			options.outputName ?? "shader_code.h", // outputName
			options.format ?? "c-variables", // outputFormat
			options.verbose ?? false, // verbose
			options.debug ?? false, // debug
			options.fieldNames ?? "xyzw", // canonicalFieldNames
			!!(options.preserveExternals || options.preserveAllGlobals), // preserveExternals
			options.preserveAllGlobals ?? false, // preserveAllGlobals
			options.hlsl ?? false, // hlsl
			options.noInlining ?? false, // noInlining
			options.noOverloading ?? false, // noOverloading
			!!(options.aggressiveInlining && !options.noInlining), // aggroInlining
			options.noSequence ?? false, // noSequence
			options.noRenaming ?? false, // noRenaming
			// noRenamingList
			typeof options.noRenamingList === "string"
				? options.noRenamingList.split(",")
				: (options.noRenamingList ?? ["main", "mainImage"]),
			options.noRemoveUnused ?? false, // noRemoveUnused
			options.moveDeclarations ?? false, // moveDeclarations
			options.preprocess ?? false, // preprocess
			options.exportKkpSymbolMaps ?? false, // exportKkpSymbolMaps
		);
	};
}

export async function minify(
	sources: Record<string, string>,
	options: Options = {},
): Promise<string> {
	const minifier = await createMinifier();
	return minifier(sources, options);
}
