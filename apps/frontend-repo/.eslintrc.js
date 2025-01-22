/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "react/jsx-sort-props": "off",
    "unicorn/filename-case": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};
