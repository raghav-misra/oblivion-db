import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.js",

    output: {
        file: "dist/index.js",
        format: "cjs",
        compact: true,
        sourcemap: true
    },

    plugins: [terser()]
};