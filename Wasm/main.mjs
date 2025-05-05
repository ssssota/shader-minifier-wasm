// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { dotnet } from "./_framework/dotnet.js";

const dotnetExportsPromise = dotnet
	.withDiagnosticTracing(false)
	.create()
	.then(({ getAssemblyExports, getConfig }) => {
		const config = getConfig();
		const exports = getAssemblyExports(config.mainAssemblyName);
		return exports;
	});

/**
 * Minify the GLSL(or HLSL) source code
 * @param {string} source Shared source code to minify
 * @param {string[]} flags Minification flags
 * @returns {Promise<string>} The minified source code
 */
export async function minify(source, flags = []) {
	const { Minifier } = await dotnetExportsPromise;
	return Minifier.Minify(source, flags);
}
