(function () {
    "use strict";

    module.exports = {
        test: {
            src: ["test/**/*.ts"],
            outDir: "dist/test",
            options: {
                target: "ES5",
                module: "commonjs",
                sourceMap: false,
                declaration: false,
                removeComments: false
            }
        },
        src: {
            src: ["src/ts/**/*.ts"],
            outDir: "dist/app" ,
            options: {
                target: "ES5",
                module: "commonjs",
                sourceMap: false,
                noImplicitAny: true,
                declaration: false,
                removeComments: false,
                suppressImplicitAnyIndexErrors: true
            }
        },
    };
})();