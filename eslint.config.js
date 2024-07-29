import javascript from "@eslint/js";
import prettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import reactHooks from "eslint-plugin-react-hooks";
import reactJSXRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import typescript from "typescript-eslint";

export default [
    javascript.configs.recommended,
    prettier,
    ...typescript.configs.recommended,
    ...typescript.configs.stylistic,
    ...astro.configs.recommended,
    reactJSXRuntime,
    {
        files: ["**/*.tsx"],
        rules: {
            "react/no-unknown-property": "error",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        rules: reactHooks.configs.recommended.rules,
        plugins: {
            "react-hooks": reactHooks,
        },
    },
    {
        ignores: ["node_modules/", ".astro/"],
    },
    {
        rules: {
            "@typescript-eslint/ban-ts-comment": "off",
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
];
