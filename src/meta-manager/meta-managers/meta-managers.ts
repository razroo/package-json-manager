export interface MetaManager {
  programmingLanguage: string;
  metaFiles: string[];
}

const metaManagers: MetaManager[] = [
  { programmingLanguage: 'C', metaFiles: ['Makefile'] },
  { programmingLanguage: 'C++', metaFiles: ['CMakeLists.txt'] },
  {
    programmingLanguage: 'C#',
    metaFiles: ['project.json', 'packages.config', 'csproj'],
  },
  { programmingLanguage: 'Clojure', metaFiles: ['deps.edn'] },
  { programmingLanguage: 'CoffeeScript', metaFiles: ['package.json'] },
  { programmingLanguage: 'Dart', metaFiles: ['pubspec.yaml'] },
  { programmingLanguage: 'Elixir', metaFiles: ['mix.exs'] },
  { programmingLanguage: 'Erlang', metaFiles: ['rebar.config'] },
  { programmingLanguage: 'Go', metaFiles: ['go.mod', 'go.sum'] },
  { programmingLanguage: 'Haskell', metaFiles: ['stack.yaml', 'cabal.config'] },
  { programmingLanguage: 'Java', metaFiles: ['pom.xml', 'build.gradle'] },
  { programmingLanguage: 'JavaScript (Back-end)', metaFiles: ['package.json'] },
  { programmingLanguage: 'JavaScript (Front-end)', metaFiles: ['package.json'] },
  { programmingLanguage: 'Kotlin', metaFiles: ['build.gradle.kts', 'build.gradle'] },
  { programmingLanguage: 'Lua', metaFiles: ['rockspec'] },
  {
    programmingLanguage: '.NET',
    metaFiles: ['project.json', 'packages.config', 'csproj'],
  },
  { programmingLanguage: 'Objective-C', metaFiles: ['Podfile'] },
  { programmingLanguage: 'Perl', metaFiles: ['META.json', 'META.yml', 'cpanfile'] },
  { programmingLanguage: 'PHP', metaFiles: ['composer.json', 'composer.lock'] },
  { programmingLanguage: 'Python', metaFiles: ['setup.py', 'requirements.txt', 'Pipfile', 'pyproject.toml'] },
  { programmingLanguage: 'R', metaFiles: ['DESCRIPTION', 'NAMESPACE'] },
  { programmingLanguage: 'Ruby', metaFiles: ['Gemfile', 'Gemfile.lock', 'Rakefile'] },
  { programmingLanguage: 'Rust', metaFiles: ['Cargo.toml', 'Cargo.lock'] },
  { programmingLanguage: 'Scala', metaFiles: ['build.sbt'] },
  { programmingLanguage: 'Swift', metaFiles: ['Package.swift'] },
  { programmingLanguage: 'TypeScript', metaFiles: ['package.json'] },
];
