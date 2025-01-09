/*
 * @Author: master
 * @Date: 2020-12-15 21:14:49
 * @LastEditTime: 2023-03-30 16:41:32
 * @Description: eslint检测
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  globals: {
    webpackConfig: "readonly", // 配置多级目录访问地址
  },
  // Prettier will be automatically injected by plugin:prettier/recommended
  plugins: ["eslint-plugin-babel", "eslint-plugin-vue", "eslint-plugin-html"],
  settings: {
    "import/resolver": "webpack",
  },
  rules: {
    "no-new": "off",
    "no-debugger": "warn",
    "no-var": "error",
    // 圈复杂度
    complexity: ["error", 10],
    // 块嵌套最大深度
    "max-depth": ["error", 5],
    // 最大行长
    "max-len": ["error", { code: 100, tabWidth: 4 }],
    // 一个文件最大行数
    "max-lines": [
      "error",
      { max: 500, skipBlankLines: true, skipComments: true },
    ],
    // 回调嵌套最大深度
    "max-nested-callbacks": ["error", { max: 5 }],
    // 一个方法最大行数
    "max-lines-per-function": ["error", 80],
    // 禁止多空行
    "no-multiple-empty-lines": ["error"],
    // 禁止分号结尾
    semi: ["error", "never"],
    // 该规则规定了在对象字面量语法中key和value之间的空白，冒号前不要留空格，冒号后面需留一个空格
    "key-spacing": [2, { beforeColon: false, afterColon: true }],
    // 该规则规定了在逗号前不要留空格，逗号后面需留一个空格
    "comma-spacing": ["error", { before: false, after: true }],
    // 使用空格缩进
    indent: ["error"],
  },
  parser: "vue-eslint-parser",
  // extends eslint config
  extends: [
    "eslint-config-standard",
    // integrate eslint-plugin-prettier with eslint-config-prettier
    "plugin:eslint-plugin-prettier/recommended",
    "eslint-config-prettier/babel",
    "eslint-config-prettier/vue",
    "eslint-config-prettier/standard",
  ],
  // 如果项目中配置了ts的话可以加上overrides
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-undef": "off",
      },
    },
  ],
}
