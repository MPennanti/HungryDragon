(function () {
    "use strict";

    module.exports = {
        src: {
            src: ["src/ts/**/*.ts", "src/ts/**/*.tsx", "typings/references.d.ts"],
            filter: function (path) {
                return !path.endsWith('test.ts')
            },
            outDir: "dist/app" ,
            options: {
                target: "ES5",
                module: "commonjs",
                sourceMap: false,
                noImplicitAny: true,
                declaration: false,
                removeComments: false,
                suppressImplicitAnyIndexErrors: true,
                jsx: "react"
            }
        },
        test: {
            src: ["src/ts/**/*.test.ts", "typings/test.references.d.ts"],
            outDir: "dist/app" ,
            options: {
                target: "ES5",
                module: "commonjs",
                sourceMap: false,
                noImplicitAny: true,
                declaration: false,
                removeComments: false,
                suppressImplicitAnyIndexErrors: true,
            }
        },
    };
})();