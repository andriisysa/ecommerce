/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  tabWidth: 2,
  endOfLine: "lf",
  singleQuote: true,
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/layouts/(.*)$",
    "^types$",
    "^@/hooks/(.*)$",
    "^@/components/(.*)$",
    "^@/types",
    "^@/types/(.*)$",
    "^@/config",
    "^@/config/(.*)$",
    "^@/redux",
    "^@/redux/(.*)$",
    "^@/utils",
    "^@/utils/(.*)$",
    "^@/app/(.*)$",
    "^@/routes",
    "",
    "^~/img/(.*)$",
    "^~/svg/(.*)$",
    "",
    "^@/styles/(.*)$",
    "",
    "^[./]",
  ],
  trailingComma: "es5",
  importOrderSeparation: false,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
}
