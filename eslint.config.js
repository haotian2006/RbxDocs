import js from "@eslint/js";
import astro from "eslint-plugin-astro";
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
