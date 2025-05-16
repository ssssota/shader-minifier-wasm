using System.Linq;
using System.Runtime.InteropServices.JavaScript;
return;

public partial class Minifier
{
  [JSExport]
  internal static string Minify(string[] sources, string[] flags)
  {
    var files = sources.Chunk(2).Select(chunk => new System.Tuple<string, string>(chunk[0], chunk[1])).ToArray();
    var options = ShaderMinifier.Minifier.ParseOptions(flags);
    var minifier = new ShaderMinifier.Minifier(options, files);
    var writable = new System.IO.StringWriter();
    minifier.Format(writable);
    var result = writable.ToString();
    return result;
  }
}
