import javascript from "@eslint/js";
import prettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import typescript from "typescript-eslint";

export default typescript.config(
    javascript.configs.recommended,
    prettier,
    ...typescript.configs.recommended,
    ...typescript.configs.stylistic,
    ...astro.configs.recommended,
    {
        ...react.configs.flat.recommended,
        ...react.configs.flat["jsx-runtime"],

        files: ["**/*.{jsx,tsx}"],
        languageOptions: {
            ...react.configs.flat.recommended.languageOptions,
            ...react.configs.flat["jsx-runtime"].languageOptions,

            globals: {
                ...globals.browser,
                ...globals.serviceworker,
            },
        },
        rules: {
            ...react.configs.flat.recommended.rules,
            ...react.configs.flat["jsx-runtime"].rules,

            "react/display-name": "off",
            "react/no-unknown-property": "error",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        plugins: {
            "react-hooks": reactHooks,
        },
        rules: reactHooks.configs.recommended.rules,
    },
    {
        ignores: [".astro/", "dist/", "node_modules/"],
    },
    {
        rules: {
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/triple-slash-reference": "off",
            "import/no-anonymous-default-export": "off",
            "no-console": "warn",
            "no-control-regex": "off",
        },
    },
);
