using System.Linq;
using System.Runtime.InteropServices.JavaScript;
using Microsoft.FSharp.Collections;

return;

public partial class Minifier
{
  private static Options.OutputFormat GetOutputFormat(string outputFormat)
  {
    return outputFormat switch
    {
      "text" => Options.OutputFormat.Text,
      "indented" => Options.OutputFormat.IndentedText,
      "c-variables" => Options.OutputFormat.CVariables,
      "c-array" => Options.OutputFormat.CArray,
      "js" => Options.OutputFormat.JS,
      "nasm" => Options.OutputFormat.Nasm,
      "rust" => Options.OutputFormat.Rust,
      "json" => Options.OutputFormat.Json,
      _ => throw new System.ArgumentException($"Unknown output format: {outputFormat}")
    };
  }
  [JSExport]
  internal static string Minify(
    string[] sources,
    bool version,
    string outputName,
    string outputFormat,
    bool verbose,
    bool debug,
    string canonicalFieldNames,
    bool preserveExternals,
    bool preserveAllGlobals,
    bool hlsl,
    bool noInlining,
    bool noOverloading,
    bool aggroInlining,
    bool noSequence,
    bool noRenaming,
    string[] noRenamingList,
    bool noRemoveUnused,
    bool moveDeclarations,
    bool preprocess,
    bool exportKkpSymbolMaps
  )
  {
    var files = sources.Chunk(2).Select(chunk => new System.Tuple<string, string>(chunk[0], chunk[1])).ToArray();
    var options = new Options.Options(
      version: version,
      outputName: outputName,
      outputFormat: GetOutputFormat(outputFormat),
      verbose: verbose,
      debug: debug,
      canonicalFieldNames: canonicalFieldNames,
      preserveExternals: preserveExternals,
      preserveAllGlobals: preserveAllGlobals,
      hlsl: hlsl,
      noInlining: noInlining,
      noOverloading: noOverloading,
      aggroInlining: aggroInlining,
      noSequence: noSequence,
      noRenaming: noRenaming,
      noRemoveUnused: noRemoveUnused,
      moveDeclarations: moveDeclarations,
      preprocess: preprocess,
      exportKkpSymbolMaps: exportKkpSymbolMaps,
      noRenamingList: ListModule.OfSeq(noRenamingList)
    );
    var minifier = new ShaderMinifier.Minifier(options, files);
    var writable = new System.IO.StringWriter();
    minifier.Format(writable);
    var result = writable.ToString();
    return result;
  }
}
