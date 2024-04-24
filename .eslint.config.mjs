// Thunderbird User.JS ESLint configuration file

import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        rules: {
            // Expect only double-quoted strings.
            quotes: ["error", "double"],

            // Expect a semicolon after each statement.
            semi: ["error", "always", {"omitLastInOneLineBlock": false}],

            // As project code style, don't allow tabulation nor trailing whitespaces.
            "no-tabs": "error",
            "no-trailing-spaces": "error",

            // Don't allow whitespace before semicolons.
            "semi-spacing": ["error", {"before": false}],

            // Don't allow irregular whitespace characters in our sheet.
            "no-irregular-whitespace": ["error", {"skipStrings": false, "skipComments": false}],
        },
        languageOptions: {
            // From <https://searchfox.org/mozilla-central/rev/c938c7416c633639a5c8ce4412be586eefb48005/modules/libpref/parser/src/lib.rs#296>
            globals: {
                pref: "readonly",
                user_pref: "readonly",
                sticky: "readonly",
                locked: "readonly",
                sticky_pref: "readonly",
            },
        },
    },
];
