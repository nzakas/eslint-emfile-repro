# ESLint Flat Config EMFILE error reproduction

This repo creates 10,000 files in a directory to illustrate how ESLint tries to read too many files simultaneously.

## Reproduction

```sh
npm install
npm run setup # creates 10,000 files
npm run lint  # runs eslint on the directory
```
