import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Ini mengizinkan penggunaan tipe `Function` tanpa warning merah
      "@typescript-eslint/ban-types": [
        "warn",
        {
          types: {
            Function: false, // Atau hapus Function dari daftar yang dilarang
            '{}': false,
          },
          extendDefaults: true,
        },
      ],

      // Ini mengurangi warning untuk penggunaan `any`
      "@typescript-eslint/no-explicit-any": "warn", // atau "off" kalau mau benar-benar bebas
    },
  },
];

export default eslintConfig;
