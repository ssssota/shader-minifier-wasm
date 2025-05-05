using System.Runtime.InteropServices.JavaScript;
return;

public partial class Minifier
{
  [JSExport]
  internal static string Minify(string source, string[] flags)
  {
    var files = new System.Tuple<string, string>[] {
        new System.Tuple<string, string>("glsl", source)
      };
    var options = ShaderMinifier.Minifier.ParseOptions(flags);
    var minifier = new ShaderMinifier.Minifier(options, files);
    var writable = new System.IO.StringWriter();
    minifier.Format(writable);
    var result = writable.ToString();
    return result;
  }
}
