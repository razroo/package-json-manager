# Package JSON Manager 

* Rule #1: There are no rules 
* Rule #2: Everything must be unit tested
* Rule #3: If you can be anything in life be kind

![Version Finder Logo](robot-bully-logo.png "BUL - The Version Finder Robot")

Package JSON Manager. Confirm that all packages can be correctly installed in a package json. 
This library will enable foundation for something like 

```
npm install @ngrx/store
```

and npm automatically installing the right version.

## Documentation

### Package Json Version Utils
```ts
// method to dynamically find package json
const packageJsonPath = findPackageJson(__dirname, )
// absolute path to directory
const projectDependencies = getProjectDependencies(packageJsonPath);
// languagesUsed will return e.g. ['angular', 'react', 'vue'];
const languagesUsed = determineLanguagesUsed(projectDependencies);
// languagesUsedWithVersionUsed will return e.g. ['angular-7.0.0', 'react-16.7.0', 'vue-15.0.0']
const languagesUsedWithVersionUsed = determineLanguagesWithVersionUsed(projectDependencies);
```

Note: We will soon have a separate documentation site for Package JSON Manager. 



