import * as fs from 'fs';
import * as path from 'path';

/**
 * Resolves the Lambda entry file path.
 *
 * When developing locally, TypeScript source files (.ts) are available under src/.
 * When consumed as an npm package, only compiled JavaScript files (.js) exist under lib/.
 * This function checks for .ts first (local dev), then falls back to .js (npm package).
 *
 * @param dir - The __dirname of the calling module
 * @param relativePath - Relative path to the Lambda handler (without extension)
 * @returns Absolute path to the entry file (.ts or .js)
 */
export function resolveEntry(dir: string, relativePath: string): string {
  const tsPath = path.join(dir, `${relativePath}.ts`);
  const jsPath = path.join(dir, `${relativePath}.js`);
  if (fs.existsSync(tsPath)) {
    return tsPath;
  }
  return jsPath;
}
