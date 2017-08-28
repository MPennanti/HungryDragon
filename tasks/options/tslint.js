(function () {
    "use strict";

    module.exports = function (grunt) {
        return {
            options: {
                configuration: "tslint.json",
            },
            files: {
                src: ["src/ts/**/*.ts", "src/ts/**/*.tsx"]
            }
        };
    };
})();