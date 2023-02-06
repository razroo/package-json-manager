import * as fs from 'fs';
import { dirname, join } from 'path';
import * as resolve from 'resolve';
import { coreProgrammingLanguagesMap } from '../core-programming-languages/core-programming-languages';

export interface PackageJson {
  name: string;
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
}

function getAllDependencies(pkg: PackageJson): Set<[string, string]> {
  return new Set([
    ...Object.entries(pkg.dependencies || []),
    ...Object.entries(pkg.devDependencies || []),
    ...Object.entries(pkg.peerDependencies || []),
    ...Object.entries(pkg.optionalDependencies || []),
  ]);
}

export interface PackageTreeNode {
  name: string;
  version: string;
  path: string;
  package: PackageJson | undefined;
}

export async function readPackageJson(packageJsonPath: string): Promise<PackageJson | undefined> {
  try {
    return JSON.parse((await fs.promises.readFile(packageJsonPath)).toString());
  } catch {
    return undefined;
  }
}

export function findPackageJson(workspaceDir: string, packageName: string): string | undefined {
  try {
    // avoid require.resolve here, see: https://github.com/angular/angular-cli/pull/18610#issuecomment-681980185
    const packageJsonPath = resolve.sync(`${packageName}/package.json`, { basedir: workspaceDir });

    return packageJsonPath;
  } catch {
    return undefined;
  }
}

export async function determineLanguagesUsed(packageJsonMap: Map<string, PackageTreeNode>): Promise<string[]> {
  const languagesUsedArr = [] as any;
  const coreProgrammingLanguages = coreProgrammingLanguagesMap();
  // TODO
  for (const coreProgrammingLanguageKey in coreProgrammingLanguages) {
    if(packageJsonMap.has(coreProgrammingLanguageKey)) {
      const coreProgrammingLanguageValue = coreProgrammingLanguages[coreProgrammingLanguageKey];
      languagesUsedArr.push(coreProgrammingLanguageValue);
    }
  }

  return languagesUsedArr;
}

export async function determineLanguagesWithVersionUsed(packageJsonMap: Map<string, PackageTreeNode>): Promise<string[]> {
  const languagesUsedWithVersionArr = [] as any;
  const coreProgrammingLanguages = coreProgrammingLanguagesMap();
  // TODO
  for (const coreProgrammingLanguageKey in coreProgrammingLanguages) {
    if(packageJsonMap.has(coreProgrammingLanguageKey)) {
      // we want to make the name non package json more human readable flavored
      // e.g. @angular/core is now angular
      const coreProgrammingLanguageValue = coreProgrammingLanguages[coreProgrammingLanguageKey];
      const packageJsonItem = packageJsonMap.get(coreProgrammingLanguageKey) as any;
      // we always want to round patch to 0
      const [major, minor] = packageJsonItem.version.split('.').map(Number);
      const versionWithPathAtZero = `${major}.${minor}.0`;
      const coreProgrammingLanguageWithVersionValue = `${coreProgrammingLanguageValue}-${versionWithPathAtZero}` ;
      languagesUsedWithVersionArr.push(coreProgrammingLanguageWithVersionValue);
    }
  }

  return languagesUsedWithVersionArr;
}

export async function getProjectDependencies(dir: string): Promise<Map<string, PackageTreeNode>> {
  const pkg = await readPackageJson(join(dir, 'package.json'));
  if (!pkg) {
    throw new Error('Could not find package.json');
  }

  const results = new Map<string, PackageTreeNode>();
  for (const [name, version] of getAllDependencies(pkg)) {
    const packageJsonPath = findPackageJson(dir, name);
    if (!packageJsonPath) {
      continue;
    }

    results.set(name, {
      name,
      version,
      path: dirname(packageJsonPath),
      package: await readPackageJson(packageJsonPath),
    });
  }

  return results;
}
