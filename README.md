# shader-minifier-wasm

Minify GLSL(HLSL) shader code using WebAssembly.

This is a WebAssembly port of [shader-minifier](https://github.com/laurentlb/shader-minifier).

## Usage

```sh
npm install shader-minifier-wasm
```

```javascript
import { minify } from 'shader-minifier-wasm';

const minified = await minify(`
  out vec4 fragColor;
  void main()
  {
      fragColor = vec4(1., 1., 1., 1.);
  }
`, { format: 'text' });

console.log(minified); // -> "out vec4 m;void main(){m=vec4(1);}"
```

NOTE: This library is using Blazor WebAssembly, it is huge. Probably not suitable in browser. If you want to use it in browser, you must copy the `node_modules/shader-minifier-wasm/dist/AppBundle/_framework` folder to your assets folder and you should use it in a web worker.

## LICENSE

MIT
