declare module "#AppBundle" {
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
	export function createMinifier(): Promise<
		(
			sources: string[],
			version: bool,
			outputName: string,
			outputFormat: string,
			verbose: bool,
			debug: bool,
			canonicalFieldNames: string,
			preserveExternals: bool,
			preserveAllGlobals: bool,
			hlsl: bool,
			noInlining: bool,
			noOverloading: bool,
			aggroInlining: bool,
			noSequence: bool,
			noRenaming: bool,
			noRenamingList: string[],
			noRemoveUnused: bool,
			moveDeclarations: bool,
			preprocess: bool,
			exportKkpSymbolMaps: bool,
		) => string
	>;
}
