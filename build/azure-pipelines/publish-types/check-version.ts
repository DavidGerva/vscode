/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import * as cp from 'child_process';

let tag = '';
try {
	tag = cp
		.execSync('git describe --tags `git rev-list --tags --max-count=1`')
		.toString()
		.trim();

	if (!isValidTag(tag)) {
		throw Error(`Invalid tag ${tag}`);
	}
} catch (err) {
	console.error(err);
	console.error('Failed to update types');
	process.exit(1);
}

function isValidTag(t: string) {
	if (t.split('.').length !== 3) {
		return false;
	}

	const [major, minor, bug] = t.split('.');

	// Only release for tags like 1.34.0
	if (bug !== '0') {
		return false;
	}

	if (parseInt(major, 10) === NaN || parseInt(minor, 10) === NaN) {
		return false;
	}

	return true;
}