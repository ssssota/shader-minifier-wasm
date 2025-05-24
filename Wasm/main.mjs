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
 * Create minifier function to minify GLSL (or HLSL) source code.
 */
export async function createMinifier() {
	const exports = await dotnetExportsPromise;
	return exports.Minifier.Minify;
}
