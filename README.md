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

## LICENSE

MIT
