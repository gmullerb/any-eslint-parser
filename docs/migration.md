# Migrating to eslint/any-eslint-parser from lintspaces

1 . Create a `.eslintrc-any.json`:

```json
  {
    "parser": "any-eslint-parser",
    "rules": {
      "eol-last": "error",
      "no-tabs": "error"
    }
  }
```

then, change the old `package.json` with lintspaces:

```json
  "scripts": {
    "lint.common": "echo ==== Lint Any ==== && lintspaces --newline --indentation \"spaces\" ./src/**/*.js* ./src/**/*.ts* ./src/**/*.html ./src/**/*.css ./docs/**/*.md ./*.json ./*.yml ./*.xml ./*.md ./*.sh ./*.txt ./.gitignore ./.npmignore",
    "lint.main": "echo ==== Lint Main Source ==== && eslint --color \"src/**/*.js\"",
    "lint.test": "echo ==== Lint Test source ==== && eslint --config config/test/.eslintrc.json --color \"tests/js/**/*.+(js|jsx)\"",
    ..
  },
  "devDependencies": {
    "eslint": "*",
    "lintspaces-cli": "*",
    ..
  }
```

## Using [`--no-eslintrc`](https://eslint.org/docs/user-guide/command-line-interface#-no-eslintrc)

2 . Change `package.json`:

```json
  "scripts": {
    "lint.common": "echo ==== Lint Any ==== && eslint --config .eslintrc-any.json \"**/[\\.a-zA-Z]*.+(js|jsx|ts|tsx|json|yml|xml|sh|txt|md|svg|html|css)\" \"**/.+(|gitignore|npmignore)\" --no-eslintrc --ignore-pattern \"build\"",
    "lint.main": "echo ==== Lint Main Source ==== && eslint --color \"src/**/*.js\"",
    "lint.test": "echo ==== Lint Test source ==== && eslint --config .eslintrc-test.json \"tests/js/**/*.+(js|jsx)\"",
    ..
  },
  "devDependencies": {
    "any-eslint-parser": "1.0.0",
    "eslint": "*",
    ..
  }
```

> It's important to use `--no-eslintrc` option to avoid `.eslintrc-any.json` from inheriting all the rules defined in the main `.eslintrc.json` and other `.eslintrc.json` files, and avoid conflicting with other parsers.

## Implicit Independent rules

When any-eslint-parser don't collide with any other project rules or parser.

2 . Change `package.json`:

a. Define a `eslintrc.json` with common rules, or not define it at all.
b. Define a `eslintrc-any.json` to be use in "all" files.
c. Define a `eslintrc-main.json` to be use in main source files.

New `package.json`:

```json
  "scripts": {
    "lint.common": "echo ==== Lint Any ==== && eslint --config .eslintrc-any.json \"**/[\\.a-zA-Z]*.+(js|jsx|ts|tsx|json|yml|xml|sh|txt|md|svg|html|css)\" \"**/.+(|gitignore|npmignore)\" --ignore-pattern \"build\"",
    "lint.main": "echo ==== Lint Main Source ==== && eslint --color --config .eslintrc-main.json \"src/**/*.js\"",
    "lint.test": "echo ==== Lint Test source ==== && eslint --config .eslintrc-test.json \"tests/js/**/*.+(js|jsx)\"",
    ..
  },
  "devDependencies": {
    "any-eslint-parser": "1.0.0",
    "eslint": "*",
    ..
  }
```

> Remember if `eslintrc-any.json` or any parent or child have rules that require AST, those will be ignored when using `any-eslint-parser`.  
> If other parsers are used in the "path" of `eslintrc-any.json` may be an issue, then use `--no-eslintrc`.

## Using [base-style-config](https://www.npmjs.com/package/eslint-plugin-base-style-config)

1 . Create a `.eslintrc-any.json`:

```json
  {
    "extends": [ "plugin:base-style-config/common-rules" ],
    "plugins": [ "base-style-config" ],
    "parser": "any-eslint-parser"
  }
```

2 . Change `package.json`:

```json
  "scripts": {
    "lint.common": "echo ==== Lint Any ==== && eslint --config .eslintrc-any.json \"**/[\\.a-zA-Z]*.+(js|jsx|ts|tsx|json|yml|xml|sh|txt|md|svg|html|css)\" \"**/.+(|gitignore|npmignore)\" --no-eslintrc --ignore-pattern \"build\"",
    "lint.main": "echo ==== Lint Main Source ==== && eslint --color \"src/**/*.js\"",
    "lint.test": "echo ==== Lint Test source ==== && eslint --config .eslintrc-test.json \"tests/js/**/*.+(js|jsx)\"",
    ..
  },
  "devDependencies": {
    "any-eslint-parser": "1.0.0",
    "eslint": "*",
    "eslint-plugin-base-style-config": "^2.8.0",
  }
```

[Back to homepage](../README.md)
