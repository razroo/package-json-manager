import * as fs from 'fs';
import { dirname, resolve as resolvePath } from 'path';
import { coreProgrammingLanguagesMap } from '../core-programming-languages/core-programming-languages';

export interface PackageJson {
  name: string;
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
}

export function getAllDependencies(pkg: PackageJson): Set<[string, string]> {
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

export function searchForPackageJson(dir:string = process.cwd()): string | null {
  const resolvedDir = resolvePath(dir);
  const files = fs.readdirSync(resolvedDir);

  if(files != null && files.length > 0) {
    for (const file of files) {
      const filePath = resolvePath(resolvedDir, file);
      const stat = fs.statSync(filePath);
  
      if (file === 'package.json') {
        // const pathBeforeSlice = relative(process.cwd(), filePath);
        // const FinalPath = pathBeforeSlice.slice(0,pathBeforeSlice.indexOf('\\package.json'));
        // return FinalPath;
        return dirname(filePath);
      }
    }
  
    for (const file of files) {
      const filePath = resolvePath(resolvedDir, file);
      const stat = fs.statSync(filePath);
  
      if (stat.isDirectory() && (file != 'node_modules')) {
        const found = searchForPackageJson(filePath);
        if (found) {
          return found;
        }
      }
    }
  }

  return null;
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
      const versionWithoutPrefixes = packageJsonItem.version.replace('^', '').replace('~', '');
      const [major, minor] = versionWithoutPrefixes.split('.').map(Number);
      const versionWithPathAtZero = `${major}.${minor}.0`;
      const coreProgrammingLanguageWithVersionValue = `${coreProgrammingLanguageValue}-${versionWithPathAtZero}` ;
      languagesUsedWithVersionArr.push(coreProgrammingLanguageWithVersionValue);
    }
  }

  return languagesUsedWithVersionArr;
}
