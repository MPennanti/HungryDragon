(function () {
    "use strict";

    module.exports = {
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