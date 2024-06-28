import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import reactHooks from "eslint-plugin-react-hooks";
import reactJSXRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import typescript from "typescript-eslint";

export default [
    js.configs.recommended,
    ...typescript.configs.recommendedTypeChecked,
    ...typescript.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    ...astro.configs.recommended,
    {
        ...reactRecommended,

        files: ["**/*.{jsx,tsx}"],
        languageOptions: {
            ...reactRecommended.languageOptions,

            globals: {
                ...globals.serviceworker,
                ...globals.browser,
            },
        },
        rules: {
            ...reactRecommended.rules,

            "react/no-unknown-property": "error",
        },
    },
    {
        ...reactJSXRuntime,

        settings: {
            ...reactJSXRuntime.settings,

            react: {
                version: "detect",
            },
        },
    },
    {
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
