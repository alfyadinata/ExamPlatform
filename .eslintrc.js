module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        ".eslintrc.{js,cjs,test.js}",
      ],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: [
          "Link",
        ],
        aspects: [
          "invalidHref",
          "preferButton",
        ],
      },
    ],
    "react/react-in-jsx-scope": "off",
    quotes: [
      "error",
      "double",
    ],
    "react/prop-types": "off",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ],
      },
    ],
    "max-len": "off",
    "import/prefer-default-export": "off",
    "import/no-named-as-default": "off",
    "import/no-unresolved": "off",
    "import/no-cycle": "off",
    "import/no-extraneous-dependencies": "off",
    "no-restricted-globals": "off",
    "no-restricted-syntax": [
      "off",
      "ForInStatement",
      "LabeledStatement",
      "WithStatement",
    ],
    "react/jsx-props-no-spreading": "off",
    "no-undef": "off",
    "no-console": "off",
    "default-param-last": "off",
    "jsx-a11y/label-has-associated-control": "off",
    indent: [
      "error",
      2,
    ],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
      },
    ],
    "react/jsx-curly-brace-presence": "off",
    "jsx-a11y/control-has-associated-label": "off",
  },
};
