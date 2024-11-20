/**
 *
 * 1. to activate this file to be used with eslint:
 * - rename this file to eslint.config.js
 * - run command "npx eslint ./React" from folder C:\SgcGit\Sgc.Web; it will try to lint all
 * ts|tsx files inside React folder, except *.test.ts and files inside subfolders tests.
 * - currently, when to many files are linted (the previous example is such a case)
 * it throws out the error message "Error: EMFILE: too many open files, open [...]" but doesn't show any lint results.
 *
 * 2. during the linting process some new and UNDUE errors were found with plugin import and the lib codemirror; they shall need to be addressed in the future!
 * E.g.
 * 2:28  error  Parse errors in imported module 'codemirror': parserPath or languageOptions.parser is required! (undefined:undefined) import/namespace
 * 2:28  error  Parse errors in imported module 'codemirror': parserPath or languageOptions.parser is required! (undefined:undefined) import/no-deprecated.
 *
 * 3. during the linting process this warning is also produced:
 * 98:37  warning  Unused eslint-disable directive (no problems were reported from 'import/no-default-export')
 * but if eslint is run with old .eslintrc.cjs (and option --report-unused-disable-directives) the warning is not produced!
 *
 * 2. and 3. above can be tested with command "npx eslint --report-unused-disable-directives ./React/Components/CodeMirror/CodeMirrorComponent.tsx".
 *
 */

/*
Migration Status:26 April 2024

1) it throws out the error message "Error: EMFILE: too many open files, open [...]" but doesn't show any lint results. -- (fixed)
the bug is fixed in v9.1.1
https://github.com/eslint/eslint/issues/17249

2) After patching i found that the eslint plugins used with sgc are not yet ready for flat config and eslint 9

Issues to follow up with plugins migration to eslint 9
1.	https://github.com/lirantal/eslint-plugin-anti-trojan-source/issues/4
2.	https://github.com/jsx-eslint/eslint-plugin-react/issues/3699  -- Seems to be fixed
3.	https://github.com/cartant/eslint-plugin-etc/issues/13
4.	https://github.com/facebook/react/pull/28773  -- Seems to be fixed
5.	https://github.com/SonarSource/eslint-plugin-sonarjs/issues/454 - seems to be fixed with v1.0.0
6.	https://github.com/import-js/eslint-plugin-import/issues/2948  -- Seems to be fixed
7.	https://github.com/mozilla/eslint-plugin-no-unsanitized/issues/234 -- Seems to be fixed
8.	https://github.com/eslint-community/eslint-plugin-promise/issues/449 -- Sees to be fixed
9.	https://github.com/mysticatea/eslint-plugin-eslint-comments/issues/79 -- Repo not maintained. asking to migrate to https://github.com/eslint-community/eslint-plugin-eslint-comments
10.	https://github.com/dustinspecker/eslint-plugin-no-use-extend-native/issues/136 -- Fixed in 0.60

3) we can migrate to eslint 9 by setting  environment variable ESLINT_USE_FLAT_CONFIG to false and force to use legacy eslintrcl
 However npm install does not succeed when we upgrade eslint to 9 because of peer dependency problem like other npm packages still depends on eslint 8.x

 */
//#region Eslint Plugins

import pluginAntiTrojanSource from "eslint-plugin-anti-trojan-source";
import pluginArrayFunc from "eslint-plugin-array-func";
import pluginEslintComments from "eslint-plugin-eslint-comments";
import pluginNoUnsanitized from "eslint-plugin-no-unsanitized";
import pluginNoUseExtendNative from "eslint-plugin-no-use-extend-native";
import pluginOptimizeRegex from "eslint-plugin-optimize-regex";
import pluginPromise from "eslint-plugin-promise";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginSonarjs from "eslint-plugin-sonarjs";

import pluginStylistic from "@stylistic/eslint-plugin";

import pluginTypescript from "@typescript-eslint/eslint-plugin";
import pluginUnicorn from "eslint-plugin-unicorn";
import pluginXss from "eslint-plugin-xss";

//#endregion

import parserTsEslint from "@typescript-eslint/parser";


export default [
    {
        files: [
            "**/*.{ts,tsx}"
        ],

        languageOptions: {
            ecmaVersion: 2022, // Allows for the parsing of modern ECMAScript features

            // parser: parserTsEslint, // Specifies the TS ESLint parser

            parserOptions: {
                projectService:true,
                tsconfigRootDir: import.meta.dirname
            }
        },

        linterOptions: {
            reportUnusedDisableDirectives: "off"
        },

        settings: {
            "react": {
                version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
            },

            // below is config for eslint-import-resolver-typescript as in url https://github.com/import-js/eslint-import-resolver-typescript
            "import/parsers": {
                "@typescript-eslint/parser": [".ts", ".tsx"]
            },

            "import/resolver": {
                "typescript": {
                    "alwaysTryTypes": true // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
                }
            }
        },

        plugins: {
            "anti-trojan-source": pluginAntiTrojanSource,
            "array-func": pluginArrayFunc,
            "eslint-comments": pluginEslintComments,
            "no-unsanitized": pluginNoUnsanitized,
            "no-use-extend-native": pluginNoUseExtendNative,
            "optimize-regex": pluginOptimizeRegex,
            "promise": pluginPromise,
            "react": pluginReact,
            "react-hooks": pluginReactHooks,
            "sonarjs": pluginSonarjs,
            "@stylistic": pluginStylistic,
            "@typescript-eslint": pluginTypescript,
            "unicorn": pluginUnicorn,
            "xss": pluginXss
        },

        rules: {
            //#region ESLint Rules

            //#region ESLint Rules: Possible Problems

            "array-callback-return": "error",
            "constructor-super": "error",
            "for-direction": "error",
            "getter-return": "error",
            "no-async-promise-executor": "error",
            "no-await-in-loop": "error",
            "no-class-assign": "error",
            "no-compare-neg-zero": "error",
            "no-cond-assign": "error",
            "no-const-assign": "error",
            "no-constant-binary-expression": "error",
            "no-constant-condition": "error",
            "no-constructor-return": "error",
            "no-control-regex": "error",
            "no-debugger": "error",
            "no-dupe-args": "error",
            "no-dupe-class-members": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-dupe-else-if": "error",
            "no-dupe-keys": "error",
            "no-duplicate-case": "error",
            "no-duplicate-imports": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-empty-character-class": "error",
            "no-empty-pattern": "error",
            "no-ex-assign": "error",
            "no-fallthrough": "error",
            "no-func-assign": "error",
            "no-import-assign": "error",
            "no-inner-declarations": "error",
            "no-invalid-regexp": "error",
            "no-irregular-whitespace": "error",
            "no-loss-of-precision": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-misleading-character-class": "error",
            "no-new-native-nonconstructor": "error",
            "no-new-symbol": "error",
            "no-obj-calls": "error",
            "no-promise-executor-return": "error",
            "no-prototype-builtins": "error",
            "no-self-assign": "error",
            "no-self-compare": "error",
            "no-setter-return": "error",
            "no-sparse-arrays": "error",
            "no-template-curly-in-string": "error",
            "no-this-before-super": "error",
            "no-undef": "off", //1576 errors on JQueryPromise ! at url https://stackoverflow.com/questions/60743389/eslint-defined-global-extensions-still-not-defined-no-undef I found this: "We strongly recommend that you do not use the no-undef lint rule on TypeScript projects".
            "no-unexpected-multiline": "error",
            "no-unmodified-loop-condition": "error",
            "no-unreachable": "error",
            "no-unreachable-loop": "error",
            "no-unsafe-finally": "error",
            "no-unsafe-negation": "error",
            "no-unsafe-optional-chaining": "error",
            "no-unused-private-class-members": "error",
            "no-unused-vars": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-use-before-define": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-useless-backreference": "error",
            "require-atomic-updates": "error",
            "use-isnan": "error",
            "valid-typeof": "error",

            //#endregion ESLint Rules: Possible Problems

            //#region ESLint Rules: Suggestions

            "accessor-pairs": "error",
            "arrow-body-style": ["error", "as-needed"],
            "block-scoped-var": "error",
            "camelcase": "off",
            "capitalized-comments": "off",
            "class-methods-use-this": "off", // Reavaluate Later - Force to be Static
            "complexity": "off",
            "consistent-return": "error",
            "consistent-this": "error",
            "curly": "error",
            "default-case": "off", // 577 errors!
            "default-case-last": "error",
            "default-param-last": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "dot-notation": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "eqeqeq": [
                "error",
                "always",
                { "null": "ignore" }
            ], // always use type safe eq operators except for null where loose safe eq may be used
            "func-name-matching": "error",
            "func-names": "error",
            "func-style": [
                "error",
                "declaration",
                { "allowArrowFunctions": true }
            ],
            "grouped-accessor-pairs": "error",
            "guard-for-in": "error",
            "id-denylist": "off",
            "id-length": "off",
            "id-match": "off",
            "init-declarations": "off",
            "line-comment-position": "off", // 59 errors!
            "logical-assignment-operators": "off", //NEW: 82 errors found! Needs decision on which option to choose if any!!! eg: "47:9  error  Assignment (=) can be replaced with operator assignment (??=)  logical-assignment-operators"
            "max-classes-per-file": ["error", 1],
            "max-depth": "off", // MGG: 46 errors!
            "max-lines": "off",
            "max-lines-per-function": "off",
            "max-nested-callbacks": [
                "error",
                { "max": 3 }
            ],
            "max-params": "off",
            "max-statements": "off",
            "multiline-comment-style": "off",
            "new-cap": "off", // 2639 errors
            "no-alert": "error",
            "no-array-constructor": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-bitwise": "off", // MGG: 36 errors!
            "no-caller": "error",
            "no-case-declarations": "error",
            "no-console": "error",
            "no-continue": "error",
            "no-delete-var": "error",
            "no-div-regex": "error",
            "no-else-return": "error",
            "no-empty": "error",
            "no-empty-function": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-empty-static-block": "error",
            "no-eq-null": "off", // should be OFF as it's disabled to allow comparisons (like xpto == null) to spot both a null value or an undefined value
            "no-eval": "error",
            "no-extend-native": "error",
            "no-extra-bind": "error",
            "no-extra-boolean-cast": "error",
            "no-extra-label": "error",
            "no-global-assign": "error",
            "no-implicit-coercion": "error",
            "no-implicit-globals": "error",
            "no-implied-eval": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-inline-comments": "off",
            "no-invalid-this": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-iterator": "error",
            "no-label-var": "error",
            "no-labels": "error",
            "no-lone-blocks": "error",
            "no-lonely-if": "error",
            "no-loop-func": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-magic-numbers": "off",
            "no-multi-assign": "error",
            "no-multi-str": "error",
            "no-negated-condition": "off",
            "no-nested-ternary": "error",
            "no-new": "error",
            "no-new-func": "error",
            "no-new-wrappers": "error",
            "no-nonoctal-decimal-escape": "error",
            "no-object-constructor": "error",
            "no-octal": "error",
            "no-octal-escape": "error",
            "no-param-reassign": "off", // REMARK: some corrections to apply the rule caused a bug!
            "no-plusplus": "error",
            "no-proto": "error",
            "no-redeclare": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-regex-spaces": "error",
            "no-restricted-exports": "error",
            "no-restricted-globals": "error",
            "no-restricted-imports": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-restricted-properties": "error",
            "no-restricted-syntax": "error",
            "no-return-assign": "error",
            "no-script-url": "error",
            "no-sequences": "error",
            "no-shadow": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-shadow-restricted-names": "error",
            "no-ternary": "off",
            "no-throw-literal": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-undef-init": "error",
            "no-undefined": "error",
            "no-underscore-dangle": "off", // 38267 errors !!!!
            "no-unneeded-ternary": "error",
            "no-unused-expressions": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-unused-labels": "error",
            "no-useless-call": "error",
            "no-useless-catch": "error",
            "no-useless-computed-key": "error",
            "no-useless-concat": "error",
            "no-useless-constructor": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "no-useless-escape": "error",
            "no-useless-rename": "error",
            "no-useless-return": "error",
            "no-var": "error",
            "no-void": "off", // ["error", { "allowAsStatement": true }], // Reavaluate Later; 174 errors !   ["error", { "allowAsStatement": true }],
            "no-warning-comments": "error",
            "no-with": "error",
            "object-shorthand": ["error", "always"],
            "one-var": ["error", "never"],
            "operator-assignment": "error",
            "prefer-arrow-callback": "error",
            "prefer-const": "error",
            "prefer-destructuring": [
                "error",
                {
                    "VariableDeclarator": {
                        "array": true,
                        "object": false
                    },
                    "AssignmentExpression": {
                        "array": false,
                        "object": false
                    }
                }
            ],
            "prefer-exponentiation-operator": "off", // 8 errors; needs decision!
            "prefer-named-capture-group": "off", // NG : Devia ser Activado
            "prefer-numeric-literals": "error",
            "prefer-object-has-own": "error",
            "prefer-object-spread": "error",
            "prefer-promise-reject-errors": [
                "error",
                { "allowEmptyReject": true }
            ],
            "prefer-regex-literals": "error",
            "prefer-rest-params": "error",
            "prefer-spread": "error",
            "prefer-template": "error",
            "radix": "error",
            "require-await": "off", // Configured below on Typescript-ESLint Rules: Extension Rules
            "require-unicode-regexp": "error",
            "require-yield": "error",
            "sort-imports": "off",
            "sort-keys": "off",
            "sort-vars": "error",
            "strict": "error",
            "symbol-description": "error",
            "unicode-bom": "off", // ["error","always"], 4011 errors!!
            "vars-on-top": "error",
            "yoda": "error",

            //#endregion ESLint Rules: Suggestions

            //#endregion ESLint Rules

            //#region ESLint Stylistic

            "@stylistic/array-bracket-newline": ["error", "consistent"],
            "@stylistic/array-bracket-spacing": ["error", "never"],
            "@stylistic/array-element-newline": ["error", "consistent"],
            "@stylistic/arrow-parens": "off", // Ongoing: assess what are the best options to use: error or ["error", "as-needed", { "requireForBlockBody": true }], //;Reavaluate Later: 1617 errors!
            "@stylistic/arrow-spacing": "error",
            "@stylistic/comma-style": ["error", "last"],
            "@stylistic/computed-property-spacing": ["error", "never"],
            "@stylistic/dot-location": ["error", "property"],
            "@stylistic/eol-last": "off", //["error", "never"] - 1098 errors !
            "@stylistic/function-call-argument-newline": ["error", "consistent"],
            "@stylistic/function-paren-newline": ["error", "consistent"],
            "@stylistic/generator-star-spacing": "error",
            "@stylistic/implicit-arrow-linebreak": "off", // 191 errors!
            "@stylistic/jsx-quotes": "error",
            "@stylistic/line-comment-position": "off",
            "@stylistic/linebreak-style": ["error", "windows"],
            "@stylistic/max-len": "off", // 47643 errors!
            "@stylistic/max-statements-per-line": [
                "error",
                { "max": 2 }
            ], // this setting doesn't make additional errors in relation to off; if max=1 is chosen then we'll have 121 errors!
            "@stylistic/multiline-comment-style": "off",
            "@stylistic/multiline-ternary": ["error", "always-multiline"],
            "@stylistic/new-parens": "error",
            "@stylistic/newline-per-chained-call": "error",
            "@stylistic/no-confusing-arrow": [
                "error",
                { "allowParens": true }
            ],
            "@stylistic/no-floating-decimal": "error",
            "@stylistic/no-mixed-operators": "error",
            "@stylistic/no-mixed-spaces-and-tabs": "error",
            "@stylistic/no-multi-spaces": "error",
            "@stylistic/no-multiple-empty-lines": [
                "error",
                {
                    "max": 1,
                    "maxEOF": 0
                }
            ],
            "@stylistic/no-tabs": [
                "error",
                { "allowIndentationTabs": true }
            ],
            "@stylistic/no-trailing-spaces": "error",
            "@stylistic/no-whitespace-before-property": "error",
            "@stylistic/nonblock-statement-body-position": "error",
            "@stylistic/object-curly-newline": [
                "error",
                { "consistent": true }
            ],
            "@stylistic/object-property-newline": [
                "error",
                { "allowAllPropertiesOnSameLine": true }
            ],
            "@stylistic/one-var-declaration-per-line": "error",
            "@stylistic/operator-linebreak": [
                "error",
                "before",
                { "overrides": { "=": "after" } }
            ],
            "@stylistic/padded-blocks": "off", // Nice rule to implement but: if "padded-blocks": ["error", "always"] then 147855 errors!!!! if "padded-blocks": ["error", "never"] then 7395 errors!!
            "@stylistic/quote-props": ["error", "consistent"],
            "@stylistic/rest-spread-spacing": "error",
            "@stylistic/semi-spacing": "error",
            "@stylistic/semi-style": ["error", "last"],
            "@stylistic/space-in-parens": "error",
            "@stylistic/space-unary-ops": "error",
            "@stylistic/spaced-comment": "off",
            "@stylistic/switch-colon-spacing": "error",
            "@stylistic/template-curly-spacing": "error",
            "@stylistic/template-tag-spacing": "error",
            "@stylistic/wrap-iife": "error",
            "@stylistic/wrap-regex": "error",
            "@stylistic/yield-star-spacing": "error",

            //#region ESLint Stylistic: Typescript Rules

            "@stylistic/block-spacing": "error",
            "@stylistic/brace-style": [
                "error",
                "1tbs",
                { "allowSingleLine": true }
            ],
            "@stylistic/comma-dangle": ["error", "never"],
            "@stylistic/comma-spacing": [
                "error",
                {
                    "before": false,
                    "after": true
                }
            ],
            "@stylistic/func-call-spacing": "error",
            "@stylistic/function-call-spacing": "error",
            "@stylistic/indent": "off", // "MGG: broken rule: "the indent rule is broken on TypeScript codebases. Due to bandwidth constraints it will remain broken indefinitely [...]"
            "@stylistic/key-spacing": "error",
            "@stylistic/keyword-spacing": "off", // We strongly recommend you do not use this rule or any other formatting linter rules!Also it causes an error on file 'React\Maintenances\Accounting\App.tsx'
            "@stylistic/lines-around-comment": "off", // NG : We Should Activate
            "@stylistic/lines-between-class-members": "off", //28306 errors!!!
            "@stylistic/member-delimiter-style": "off",
            "@stylistic/no-extra-parens": [
                "error",
                "all",
                {
                    "nestedBinaryExpressions": false,
                    "enforceForArrowConditionals": false
                }
            ],
            "@stylistic/no-extra-semi": "error",
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/padding-line-between-statements": "error",
            "@stylistic/quotes": "error",
            "@stylistic/semi": "error",
            "@stylistic/space-before-blocks": "error",
            "@stylistic/space-before-function-paren": [
                "error",
                {
                    "anonymous": "always",
                    "named": "never",
                    "asyncArrow": "always"
                }
            ],
            "@stylistic/space-infix-ops": "error",
            "@stylistic/type-annotation-spacing": "error",

            //#endregion ESLint Stylistic : Typescript Rules

            //#region ESLint Stylistic: JSX Rules

            "@stylistic/jsx-child-element-spacing": "error",
            "@stylistic/jsx-closing-bracket-location": "off", // 28759 errors!
            "@stylistic/jsx-closing-tag-location": "error",
            "@stylistic/jsx-curly-brace-presence": [
                "error",
                {
                    "props": "never",
                    "children": "always"
                }
            ],
            "@stylistic/jsx-curly-newline": "error",
            "@stylistic/jsx-curly-spacing": "error",
            "@stylistic/jsx-equals-spacing": "error",
            "@stylistic/jsx-first-prop-new-line": "error",
            "@stylistic/jsx-function-call-newline": "error",
            "@stylistic/jsx-indent": "error",
            "@stylistic/jsx-indent-props": "error",
            "@stylistic/jsx-max-props-per-line": [
                1,
                { "when": "multiline" }
            ],
            "@stylistic/jsx-newline": "off",
            "@stylistic/jsx-one-expression-per-line": [
                1,
                { "allow": "none" }
            ],
            "@stylistic/jsx-props-no-multi-spaces": "error",
            "@stylistic/jsx-self-closing-comp": "error",
            "@stylistic/jsx-sort-props": "off",
            "@stylistic/jsx-tag-spacing": "error",
            "@stylistic/jsx-wrap-multilines": "off",

            //#endregion ESLint Stylistic: JSX Rules

            "@stylistic/indent-binary-ops": "off",
            "@stylistic/type-generic-spacing": "error",
            "@stylistic/type-named-tuple-spacing": "error",

            //#endregion ESLint Stylistic

            //#region Import Rules

            //#region Import Rules - Static Analysis

            /*"import/default": "error",
            "import/named": "error",
            "import/namespace": "error",
            "import/no-absolute-path": "error",
            "import/no-cycle": "off", // NG - Stater Having Too Much Errors
            "import/no-dynamic-require": "error",
            "import/no-internal-modules": "off", // produces errors on all files!
            "import/no-relative-packages": "error",
            "import/no-relative-parent-imports": "off", // produces errors on all files!
            "import/no-restricted-paths": "off", // NA
            "import/no-self-import": "error",
            "import/no-unresolved": "off", // throws errors on all files (e.g. Unable to resolve path to module '@Generic'  import/no-unresolved)
            "import/no-useless-path-segments": [
                "error",
                { "noUselessIndex": true }
            ],
            "import/no-webpack-loader-syntax": "error",

            //#endregion Import Rules - Static Analysis

            //#region Import Rules - Helpful Warnings

            "import/export": "error",
            "import/no-deprecated": "error",
            "import/no-empty-named-blocks": "error",
            "import/no-extraneous-dependencies": "error",
            "import/no-mutable-exports": "error",
            "import/no-named-as-default": "error",
            "import/no-named-as-default-member": "error",
            "import/no-unused-modules": "off", // produces too many warnings "exported declaration 'ExecuteScriptWindow' not used within other modules" wiht the following settings:  errors[1, { "unusedExports": true, "missingExports": false }],

            //#endregion Import Rules - Helpful Warnings

            //#region Import Rules - Module Systems

            "import/no-amd": "error",
            "import/no-commonjs": "error",
            "import/no-import-module-exports": "error",
            "import/no-nodejs-modules": [
                "error",
                { "allow": ["buffer", "crypto"] }
            ],
            "import/unambiguous": "error",

            //#endregion Import Rules - Module Systems

            //#region Import Rules - Style Guide

            "import/consistent-type-specifier-style": "off",
            "import/dynamic-import-chunkname": "off", // NA
            "import/exports-last": "error",
            "import/extensions": "error",
            "import/first": "error",
            "import/group-exports": "error",
            "import/max-dependencies": "off", // we do have modules with dozens of dependencies!
            "import/newline-after-import": "error",
            "import/no-anonymous-default-export": "error",
            "import/no-default-export": "error",
            "import/no-duplicates": "error",
            "import/no-named-default": "error",
            "import/no-named-export": "off",
            "import/no-namespace": "error",
            "import/no-unassigned-import": "error",
            "import/order": "off", // needs a decision
            "import/prefer-default-export": "off",

            //#endregion Import Rules - Style Guide

            //#endregion Import Rules*/

            //#region React Rules

            //#region React Rules: Supported Rules

            "react/boolean-prop-naming": "off",
            "react/button-has-type": "error",
            "react/default-props-match-prop-types": "error",
            "react/destructuring-assignment": "off", // 6486 errors!
            "react/display-name": "off",
            "react/forbid-component-props": "off",
            "react/forbid-dom-props": "off",
            "react/forbid-elements": "off",
            "react/forbid-foreign-prop-types": "error",
            "react/forbid-prop-types": "error",
            "react/function-component-definition": "off",
            "react/hook-use-state": "off", //MGG: 13 errors found! eg: "17:15  error  useState call is not destructured into value + setter pair  react/hook-use-state"
            "react/iframe-missing-sandbox": "error",
            "react/no-access-state-in-setstate": "error",
            "react/no-adjacent-inline-elements": "error",
            "react/no-array-index-key": "error",
            "react/no-arrow-function-lifecycle": "error",
            "react/no-children-prop": "error",
            "react/no-danger": "error",
            "react/no-danger-with-children": "error",
            "react/no-deprecated": "error",
            "react/no-did-mount-set-state": "error",
            "react/no-did-update-set-state": "error",
            "react/no-direct-mutation-state": "error",
            "react/no-find-dom-node": "error",
            "react/no-invalid-html-attribute": "error",
            "react/no-is-mounted": "error",
            "react/no-multi-comp": "off", // MGG: we cannot enable this rule as we currently define components inside components (e.g. prop renders of Controls_Lookup)!
            "react/no-namespace": "error",
            "react/no-object-type-as-default-prop": "off", //NEW: 16964 errors found! eg: "1:1  error  Definition for rule 'react/no-object-type-as-default-prop' was not found  react/no-object-type-as-default-prop"
            "react/no-redundant-should-component-update": "error",
            "react/no-render-return-value": "error",
            "react/no-set-state": "off", // MGG: deactivated because the following doesn't apply: "When using an architecture that separates your application state from your UI components (e.g. Flux), it may be desirable to forbid the use of local component state"
            "react/no-string-refs": "error",
            "react/no-this-in-sfc": "error",
            "react/no-typos": "error",
            "react/no-unescaped-entities": "error",
            "react/no-unknown-property": "error",
            "react/no-unsafe": "error",
            "react/no-unstable-nested-components": "error",
            "react/no-unused-class-component-methods": "error",
            "react/no-unused-prop-types": "error",
            "react/no-unused-state": "error",
            "react/no-will-update-set-state": "error",
            "react/prefer-es6-class": "error",
            "react/prefer-exact-props": "error",
            "react/prefer-read-only-props": "error",
            "react/prefer-stateless-function": "error",
            "react/prop-types": [
                "error",
                { "skipUndeclared": true }
            ],
            "react/react-in-jsx-scope": "off",
            "react/require-default-props": "off",
            "react/require-optimization": "error",
            "react/require-render-return": "error",
            "react/self-closing-comp": "error",
            "react/sort-comp": "off",
            "react/sort-default-props": "error",
            "react/sort-prop-types": "error",
            "react/state-in-constructor": "error",
            "react/static-property-placement": "error",
            "react/style-prop-object": "error",
            "react/void-dom-elements-no-children": "error",

            //#endregion React Rules: Supported Rules

            //#region React Rules: JSX-specific Rules

            "react/jsx-boolean-value": "off", // 214 errors!
            "react/jsx-child-element-spacing": "error",
            "react/jsx-closing-bracket-location": "off", // 28759 errors!
            "react/jsx-closing-tag-location": "error",
            "react/jsx-curly-brace-presence": [
                "error",
                {
                    "props": "never",
                    "children": "always"
                }
            ],
            "react/jsx-curly-newline": "error",
            "react/jsx-curly-spacing": "error",
            "react/jsx-equals-spacing": "error",
            "react/jsx-filename-extension": [
                1,
                { "extensions": [".tsx"] }
            ],
            "react/jsx-first-prop-new-line": "error",
            "react/jsx-fragments": "error",
            "react/jsx-handler-names": "off",
            "react/jsx-indent": "error",
            "react/jsx-indent-props": "error",
            "react/jsx-key": [
                1,
                { "checkFragmentShorthand": true }
            ],
            "react/jsx-max-depth": "off",
            "react/jsx-max-props-per-line": [
                1,
                { "when": "multiline" }
            ],
            "react/jsx-newline": "off",
            "react/jsx-no-bind": [
                1,
                {
                    "ignoreDOMComponents": true,
                    "ignoreRefs": true,
                    "allowArrowFunctions": true,
                    "allowFunctions": false,
                    "allowBind": false
                }
            ],
            "react/jsx-no-comment-textnodes": "error",
            "react/jsx-no-constructed-context-values": "error",
            "react/jsx-no-duplicate-props": "error",
            "react/jsx-no-leaked-render": "off", //NEW: 253 errors found! eg: "45:29  error  Potential leaked value that might cause unintentionally rendered values or rendering crashes  react/jsx-no-leaked-render"
            "react/jsx-no-literals": "error",
            "react/jsx-no-script-url": "error",
            "react/jsx-no-target-blank": "error",
            "react/jsx-no-undef": "error",
            "react/jsx-no-useless-fragment": [
                "error",
                { "allowExpressions": true }
            ],
            "react/jsx-one-expression-per-line": [
                1,
                { "allow": "none" }
            ],
            "react/jsx-pascal-case": "off", // MGG: can't be used because of the _ in the middle of react components names (e.g. Controls_TabPage)
            "react/jsx-props-no-multi-spaces": "error",
            "react/jsx-props-no-spreading": "off", // 1992 errors!
            "react/jsx-sort-props": "off",
            "react/jsx-tag-spacing": "error",
            "react/jsx-uses-react": "error",
            "react/jsx-uses-vars": "error",
            "react/jsx-wrap-multilines": "off",

            //#endregion React Rules: JSX-specific Rules

            //#endregion React Rules

            // //#region Typescript-ESLint Rules

            // //#region Typescript-ESLint Rules: Supported Rules (recommended & not recommended)

            // "@typescript-eslint/adjacent-overload-signatures": "error",
            // "@typescript-eslint/array-type": "off", //MGG Advice: Activate (214 errors; to make arrays declarations' more consistent)
            // "@typescript-eslint/await-thenable": "error",
            // "@typescript-eslint/ban-ts-comment": "error",
            // "@typescript-eslint/ban-tslint-comment": "error",
            // //"@typescript-eslint/ban-types": "error",
            // "@typescript-eslint/class-literal-property-style": "off", // if configured with ["error", "fields"] then 1501 errors! plus it collides with some get props we decided to put on Services
            // "@typescript-eslint/consistent-generic-constructors": "error",
            // "@typescript-eslint/consistent-indexed-object-style": "off", // 68 errors
            // "@typescript-eslint/consistent-type-assertions": "error",
            // "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
            // "@typescript-eslint/consistent-type-exports": "error",
            // "@typescript-eslint/consistent-type-imports": "error",
            // "@typescript-eslint/explicit-function-return-type": [
            //     "error",
            //     {
            //         "allowTypedFunctionExpressions": true,
            //         "allowHigherOrderFunctions": true,
            //         "allowExpressions": true
            //     }
            // ],
            // "@typescript-eslint/explicit-member-accessibility": "error",
            // "@typescript-eslint/explicit-module-boundary-types": "off", // errors on set methods (without type) and object parameters but we want them like this because of TS type inference
            // "@typescript-eslint/member-delimiter-style": "off", //651 errors! if activated with default ';? it will collide with these defs: public get TRS_MOV_FIN_RESP(): { ID: number, DESCR: string }
            // "@typescript-eslint/member-ordering": "off",
            // "@typescript-eslint/method-signature-style": "error",
            // "@typescript-eslint/naming-convention": "off",
            // "@typescript-eslint/no-base-to-string": "error",
            // "@typescript-eslint/no-confusing-non-null-assertion": "error",
            // "@typescript-eslint/no-confusing-void-expression": [
            //     "error",
            //     { "ignoreArrowShorthand": true }
            // ],
            // "@typescript-eslint/no-duplicate-enum-values": "error",
            // "@typescript-eslint/no-duplicate-type-constituents": "error",
            // "@typescript-eslint/no-dynamic-delete": "error",
            // "@typescript-eslint/no-empty-interface": "error",
            // "@typescript-eslint/no-explicit-any": [
            //     "error",
            //     { "ignoreRestArgs": false }
            // ],
            // "@typescript-eslint/no-extra-non-null-assertion": "error",
            // "@typescript-eslint/no-extraneous-class": [
            //     "error",
            //     {
            //         "allowConstructorOnly": true,
            //         "allowEmpty": true,
            //         "allowStaticOnly": true,
            //         "allowWithDecorator": true
            //     }
            // ],
            // "@typescript-eslint/no-floating-promises": "off", // NG Devia Activar
            // "@typescript-eslint/no-for-in-array": "error",
            // "@typescript-eslint/no-import-type-side-effects": "error",
            // "@typescript-eslint/no-inferrable-types": "error",
            // "@typescript-eslint/no-invalid-void-type": "error",
            // "@typescript-eslint/no-meaningless-void-operator": "error",
            // "@typescript-eslint/no-misused-new": "error",
            // "@typescript-eslint/no-misused-promises": [
            //     "error",
            //     {
            //         "checksConditionals": false
            //     }
            // ],
            // "@typescript-eslint/no-mixed-enums": "error",
            // "@typescript-eslint/no-namespace": "error",
            // "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
            // "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
            // "@typescript-eslint/no-non-null-assertion": "error",
            // "@typescript-eslint/no-redundant-type-constituents": "error",
            // "@typescript-eslint/no-require-imports": "error",
            // "@typescript-eslint/no-this-alias": "error",
            // "@typescript-eslint/no-type-alias": "off", //33 errors!
            // "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off", //52 errors! but see excel comments
            // "@typescript-eslint/no-unnecessary-condition": "off", // 23172 errors!!! all 'if (model' are detected by this rule
            // "@typescript-eslint/no-unnecessary-qualifier": "error",
            // "@typescript-eslint/no-unnecessary-type-arguments": "error",
            // "@typescript-eslint/no-unnecessary-type-assertion": "error",
            // "@typescript-eslint/no-unnecessary-type-constraint": "error",
            // "@typescript-eslint/no-unsafe-argument": "off", // 694 errors!
            // "@typescript-eslint/no-unsafe-assignment": "off", //NG :  Activar Para Completar a Tarefa de Eliminar os Any
            // "@typescript-eslint/no-unsafe-call": "off", //NG :  Activar Para Completar a Tarefa de Eliminar os Any
            // "@typescript-eslint/no-unsafe-declaration-merging": "error",
            // "@typescript-eslint/no-unsafe-enum-comparison": "off",
            // "@typescript-eslint/no-unsafe-member-access": "off", //NG :  Activar Para Completar a Tarefa de Eliminar os Any
            // "@typescript-eslint/no-unsafe-return": "off", //NG :  Activar Para Completar a Tarefa de Eliminar os Any
            // "@typescript-eslint/no-unsafe-unary-minus": "error",
            // "@typescript-eslint/no-useless-empty-export": "error",
            // //"@typescript-eslint/no-useless-template-literals": "error",
            // "@typescript-eslint/no-var-requires": "error",
            // "@typescript-eslint/non-nullable-type-assertion-style": "off",
            // "@typescript-eslint/parameter-properties": "off", //NEW: 59 errors found! eg: "7:9  error  Property Format should be declared as a class property   @typescript-eslint/parameter-properties"
            // "@typescript-eslint/prefer-as-const": "error",
            // "@typescript-eslint/prefer-enum-initializers": "error",
            // "@typescript-eslint/prefer-for-of": "error",
            // "@typescript-eslint/prefer-function-type": "error",
            // "@typescript-eslint/prefer-includes": "error",
            // "@typescript-eslint/prefer-literal-enum-member": [
            //     "error",
            //     { "allowBitwiseExpressions": true }
            // ],
            // "@typescript-eslint/prefer-namespace-keyword": "error",
            // "@typescript-eslint/prefer-nullish-coalescing": "error",
            // "@typescript-eslint/prefer-optional-chain": "off", // 831 errors (658 auto fixable)
            // "@typescript-eslint/prefer-readonly": "error",
            // "@typescript-eslint/prefer-readonly-parameter-types": "off", // 14963 errors!
            // "@typescript-eslint/prefer-reduce-type-parameter": "error",
            // "@typescript-eslint/prefer-regexp-exec": "error",
            // "@typescript-eslint/prefer-return-this-type": "error",
            // "@typescript-eslint/prefer-string-starts-ends-with": "error",
            // "@typescript-eslint/prefer-ts-expect-error": "error",
            // "@typescript-eslint/promise-function-async": "error",
            // "@typescript-eslint/require-array-sort-compare": "error",
            // "@typescript-eslint/restrict-plus-operands": "error",
            // "@typescript-eslint/restrict-template-expressions": [
            //     "error",
            //     {
            //         "allowNumber": true,
            //         "allowAny": true
            //     }
            // ],
            // "@typescript-eslint/sort-type-constituents": "off", //MGG: 251 errors; Enforce constituents of a type union/intersection to be sorted alphabetically; can be easily done with auto-fixable!
            // "@typescript-eslint/strict-boolean-expressions": "off", // 20352 errors!!!
            // "@typescript-eslint/switch-exhaustiveness-check": "off",
            // "@typescript-eslint/triple-slash-reference": "error",
            // //"@typescript-eslint/type-annotation-spacing": "error",
            // "@typescript-eslint/typedef": "off", // 21337 errors!!!
            // "@typescript-eslint/unbound-method": "off", //MGG Advice: throws an error on this kind of statement: 'gridColumn.getControlStyle = Renderer.ndiasRenderer'
            // "@typescript-eslint/unified-signatures": "error",

            // //#endregion Typescript-ESLint Rules: Supported Rules

            // //#region Typescript-ESLint Rules: Extension Rules

            // "@typescript-eslint/class-methods-use-this": "off", // Reavaluate Later - Force to be Static
            // "@typescript-eslint/default-param-last": "error",
            // "@typescript-eslint/dot-notation": "error",
            // "@typescript-eslint/init-declarations": "off",
            // "@typescript-eslint/max-params": "off",
            // "@typescript-eslint/no-array-constructor": "error",
            // "@typescript-eslint/no-dupe-class-members": "error",
            // "@typescript-eslint/no-empty-function": "error",
            // "@typescript-eslint/no-implied-eval": "error",
            // "@typescript-eslint/no-invalid-this": "error",
            // "@typescript-eslint/no-loop-func": "error",
            // "@typescript-eslint/no-loss-of-precision": "error",
            // "@typescript-eslint/no-magic-numbers": "off", // MGG: 9681 errors ! it complains about the following expressions: xpto: xpto ?? 0
            // "@typescript-eslint/no-redeclare": "error",
            // "@typescript-eslint/no-restricted-imports": "error",
            // "@typescript-eslint/no-shadow": "error",
            // //"@typescript-eslint/no-throw-literal": "error",
            // "@typescript-eslint/no-unused-expressions": [
            //     "error",
            //     {
            //         "allowShortCircuit": true,
            //         "allowTernary": true,
            //         "allowTaggedTemplates": false,
            //         "enforceForJSX": false
            //     }
            // ], // NG Should be Like This
            // "@typescript-eslint/no-unused-vars": "error",
            // "@typescript-eslint/no-use-before-define": "error",
            // "@typescript-eslint/no-useless-constructor": "error",
            // "@typescript-eslint/prefer-destructuring": "off", // We Dont Have The Parameters From The Base Rule
            // "@typescript-eslint/require-await": "error",
            // "@typescript-eslint/return-await": "error",

            // //#endregion Typescript-ESLint Rules: Extension Rules

            // //#endregion Typescript-ESLint Rules

            //#region React Hooks Rules

            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "off", // MGG: causes too many warnings with hooks-useEffect of component mount; but may be useful in identifying useEffect hooks that require dependencies!

            //#endregion React Hooks Rules

            //#region Anti Trojan Source Rules

            "anti-trojan-source/no-bidi": "error",

            //#endregion Anti Trojan Rules

            //#region Promises ESLint Rules

            "promise/always-return": "error",
            "promise/avoid-new": "off",
            "promise/catch-or-return": [
                "error",
                { "terminationMethod": ["catch", "finally"] }
            ], // "error"
            "promise/no-callback-in-promise": "warn",
            "promise/no-multiple-resolved": "error",
            "promise/no-native": "off",
            "promise/no-nesting": "off",
            "promise/no-new-statics": "error",
            "promise/no-promise-in-callback": "warn",
            "promise/no-return-in-finally": "error",
            "promise/no-return-wrap": "error",
            "promise/param-names": "error",
            "promise/prefer-await-to-callbacks": "off", //NEW: 1634 errors found! eg: "48:20  error  Avoid callbacks. Prefer Async/Await  promise/prefer-await-to-callbacks"
            "promise/prefer-await-to-then": "off",
            "promise/valid-params": "error",

            //#endregion

            //#region No Unsanitized Rules

            "no-unsanitized/method": "error",
            "no-unsanitized/property": "error",

            //#endregion No Unsanitized Rules

            //#region Eslint Comments Rules

            //#region Eslint Comments Best Practises (Recommended) Rules

            "eslint-comments/disable-enable-pair": "error",
            "eslint-comments/no-aggregating-enable": "error",
            "eslint-comments/no-duplicate-disable": "error",
            "eslint-comments/no-unlimited-disable": "error",

            "eslint-comments/no-unused-disable": "off",
            "eslint-comments/no-unused-enable": "off",

            //#endregion Eslint Comments Best Practises (Recommended) Rules

            //#region Eslint Comments Stylistic Issues Rules

            "eslint-comments/no-restricted-disable": "off",
            "eslint-comments/no-use": "off",
            "eslint-comments/require-description": "off",

            //#endregion Eslint Comments Stylistic Issues Rules

            //#endregion Eslint Comments Rules

            //#region SonarJS Rules

            //#region SonarJS Rules - Bug Detection

            "sonarjs/no-all-duplicated-branches": "error",
            "sonarjs/no-element-overwrite": "error",
            "sonarjs/no-empty-collection": "error",
            "sonarjs/no-extra-arguments": "error",
            "sonarjs/no-identical-conditions": "error",
            "sonarjs/no-identical-expressions": "error",
            "sonarjs/no-ignored-return": "error",
            "sonarjs/no-one-iteration-loop": "error",
            "sonarjs/no-use-of-empty-return-value": "error",
            "sonarjs/non-existent-operator": "error",

            //#endregion SonarJS Rules - Bug Detection

            //#region SonarJS Rules - Code Smell Detection

            "sonarjs/cognitive-complexity": "off",
            "sonarjs/elseif-without-else": "off",
            "sonarjs/max-switch-cases": "off",
            "sonarjs/no-collapsible-if": "off",
            "sonarjs/no-collection-size-mischeck": "error",
            "sonarjs/no-duplicate-string": "error",
            "sonarjs/no-duplicated-branches": "off",
            "sonarjs/no-gratuitous-expressions": "error",
            "sonarjs/no-identical-functions": "off", // we have this rule activated on sonar qube but just to detect serious cases of code duplication (the remaining cases are being resolved without fix)
            "sonarjs/no-inverted-boolean-check": "error",
            "sonarjs/no-nested-switch": "off",
            "sonarjs/no-nested-template-literals": "error",
            "sonarjs/no-redundant-boolean": "error",
            "sonarjs/no-redundant-jump": "error",
            "sonarjs/no-same-line-conditional": "error",
            "sonarjs/no-small-switch": "off",
            "sonarjs/no-unused-collection": "error",
            "sonarjs/no-useless-catch": "error",
            "sonarjs/prefer-immediate-return": "error",
            "sonarjs/prefer-object-literal": "error",
            "sonarjs/prefer-single-boolean-return": "off",
            "sonarjs/prefer-while": "error",

            //#endregion SonarJS Rules - Code Smell Detection

            //#endregion SonarJS Rules

            //#region Array-Func Rules

            "array-func/from-map": "error",
            "array-func/no-unnecessary-this-arg": "error",
            "array-func/prefer-array-from": "error",
            "array-func/avoid-reverse": "error",
            "array-func/prefer-flat-map": "error",
            "array-func/prefer-flat": "error",

            //#endregion Array-Func Rules

            //#region Etc Rules

            /*"etc/no-assign-mutated-array": "off", //NG - TempDisabled // this rule sometimes detects false 'false positives' that go against its help text: Assignment is allowed in situations in which fill, reverse or sort is called on an intermediate array
            "etc/no-commented-out-code": "off", // produces too many errors because of code we deliberately commented; however it's useful to detect bad syntax of #region and #endregion!!!
            "etc/no-const-enum": "error",
            "etc/no-deprecated": "error",
            "etc/no-enum": "off", // we want enums!
            "etc/no-implicit-any-catch": "off",
            "etc/no-internal": "error",
            "etc/no-misused-generics": "off", //NG - TempDisabled
            "etc/no-t": "off", // we like using T's on generics!
            "etc/prefer-interface": "off", // we like using mixed approach: mostly Interfaces but sometimes type!
            "etc/prefer-less-than": "off", // we also like greater than!
            "etc/throw-error": "off", // if activated produces error 'TypeError: Cannot read properties of undefined (reading 'flags')' at file ..\React\Generic\Controls\Containers\MaintenanceContainer\MaintenanceDetailContainer\MaintenanceDetailContainer\controllers\Events\Refresh.ts
            "etc/underscore-internal": "error",*/

            //#endregion Etc Rules

            //#region Optimize Regex Rules

            "optimize-regex/optimize-regex": "warn",

            //#endregion Optimize Regex Rules

            //#region Xss Rules

            "xss/no-mixed-html": "off",
            "xss/no-location-href-assign": "error",

            //#endregion Xss Rules

            //#region No Use Extend Native Rules

            "no-use-extend-native/no-use-extend-native": "error",

            //#endregion No Use Extend Native Rules

            //#region Unicorn Rules

            "unicorn/better-regex": "error",
            "unicorn/catch-error-name": "error",
            "unicorn/consistent-destructuring": "error",
            "unicorn/consistent-function-scoping": "off",
            "unicorn/custom-error-definition": "error",
            "unicorn/empty-brace-spaces": "off",
            "unicorn/error-message": "error",
            "unicorn/escape-case": "error",
            "unicorn/expiring-todo-comments": "off",
            "unicorn/explicit-length-check": "off", // MGG: 154 errors. They're all auto fixable
            "unicorn/filename-case": "off",
            "unicorn/import-style": "error",
            "unicorn/new-for-builtins": "off",
            "unicorn/no-abusive-eslint-disable": "error",
            "unicorn/no-array-callback-reference": "error",
            "unicorn/no-array-for-each": "off",
            "unicorn/no-array-method-this-argument": "error",
            "unicorn/no-array-push-push": "error",
            "unicorn/no-array-reduce": "off",
            "unicorn/no-await-expression-member": "error",
            "unicorn/no-console-spaces": "error",
            "unicorn/no-document-cookie": "error",
            "unicorn/no-empty-file": "error",
            "unicorn/no-for-loop": "off", // there is a similar rule on @typescript-eslint/prefer-for-of
            "unicorn/no-hex-escape": "error",
            "unicorn/no-instanceof-array": "error",
            "unicorn/no-invalid-remove-event-listener": "error",
            "unicorn/no-keyword-prefix": "off", //MGG: 1651 errors! Do not prefix identifiers with keywords class, new.
            "unicorn/no-lonely-if": "off",
            "unicorn/no-negated-condition": "off", // this rule produces annoying error on all files!
            "unicorn/no-nested-ternary": "error",
            "unicorn/no-new-array": "off",
            "unicorn/no-new-buffer": "error",
            "unicorn/no-null": "off",
            "unicorn/no-object-as-default-parameter": "error",
            "unicorn/no-process-exit": "error",
            "unicorn/no-static-only-class": "off",
            "unicorn/no-thenable": "error",
            "unicorn/no-this-assignment": "error",
            "unicorn/no-typeof-undefined": "off",
            "unicorn/no-unnecessary-await": "error",
            "unicorn/no-unnecessary-polyfills": "error",
            "unicorn/no-unreadable-array-destructuring": "error",
            "unicorn/no-unreadable-iife": "error",
            "unicorn/no-unsafe-regex": "error",
            "unicorn/no-unused-properties": "error",
            "unicorn/no-useless-fallback-in-spread": "error",
            "unicorn/no-useless-length-check": "error",
            "unicorn/no-useless-promise-resolve-reject": "error",
            "unicorn/no-useless-spread": "error",
            "unicorn/no-useless-switch-case": "error",
            "unicorn/no-useless-undefined": "off", // already addressed by eslint's 'no-undefined' rule
            "unicorn/no-zero-fractions": "off",
            "unicorn/number-literal-case": "error",
            "unicorn/numeric-separators-style": "off",
            "unicorn/prefer-add-event-listener": "error",
            "unicorn/prefer-array-find": "error",
            "unicorn/prefer-array-flat": "error",
            "unicorn/prefer-array-flat-map": "error",
            "unicorn/prefer-array-index-of": "error",
            "unicorn/prefer-array-some": "error",
            "unicorn/prefer-at": "error",
            "unicorn/prefer-blob-reading-methods": "error",
            "unicorn/prefer-code-point": "error",
            "unicorn/prefer-date-now": "error",
            "unicorn/prefer-default-parameters": "error",
            "unicorn/prefer-dom-node-append": "error",
            "unicorn/prefer-dom-node-dataset": "off", //TS syntax checking complains when x.dataset.<some-atribbute> is referenced !
            "unicorn/prefer-dom-node-remove": "error",
            "unicorn/prefer-dom-node-text-content": "error",
            "unicorn/prefer-event-target": "error",
            "unicorn/prefer-export-from": "error",
            "unicorn/prefer-includes": "error",
            "unicorn/prefer-json-parse-buffer": "error",
            "unicorn/prefer-keyboard-event-key": "error",
            "unicorn/prefer-logical-operator-over-ternary": "error",
            "unicorn/prefer-math-trunc": "error",
            "unicorn/prefer-modern-dom-apis": "error",
            "unicorn/prefer-modern-math-apis": "error",
            "unicorn/prefer-module": "error",
            "unicorn/prefer-native-coercion-functions": "error",
            "unicorn/prefer-negative-index": "error",
            "unicorn/prefer-node-protocol": "off", // MUST BE 'off' otherwise will cause a webpack error during JS build!
            "unicorn/prefer-number-properties": "error",
            "unicorn/prefer-object-from-entries": "error",
            "unicorn/prefer-optional-catch-binding": "error",
            "unicorn/prefer-prototype-methods": "off", //NG - TempDisabled
            "unicorn/prefer-query-selector": "off", //NG - TempDisabled
            "unicorn/prefer-reflect-apply": "error",
            "unicorn/prefer-regexp-test": "error",
            "unicorn/prefer-set-has": "error",
            "unicorn/prefer-set-size": "off", // this rule produces annoying error on all files!
            "unicorn/prefer-spread": "off",
            "unicorn/prefer-string-replace-all": "off", //MGG: cannot yet enable this as string.replaceAll requires some modern tsconfig setting (lib with ES2021 or above ?)
            "unicorn/prefer-string-slice": "error",
            "unicorn/prefer-string-starts-ends-with": "error",
            "unicorn/prefer-string-trim-start-end": "error",
            "unicorn/prefer-switch": "error",
            "unicorn/prefer-ternary": "off",
            "unicorn/prefer-top-level-await": "error",
            "unicorn/prefer-type-error": "error",
            "unicorn/prevent-abbreviations": "off", //MGG: 16683 errors! We have abbreviations everywhere !!!
            "unicorn/relative-url-style": "error",
            "unicorn/require-array-join-separator": "error",
            "unicorn/require-number-to-fixed-digits-argument": "error",
            "unicorn/require-post-message-target-origin": "off",
            "unicorn/string-content": "error",
            "unicorn/switch-case-braces": ["error", "avoid"],
            "unicorn/template-indent": "error",
            "unicorn/text-encoding-identifier-case": "off",
            "unicorn/throw-new-error": "error",

            //#endregion Unicorn Rules
        }
    }
];
