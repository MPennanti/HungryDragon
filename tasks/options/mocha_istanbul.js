(function () {
    "use strict";

    module.exports = {
        coverage: {
            src: "dist/app/test/**/*.js",
            options: {
                mask: "*.test.js"
            }
        }
    };
})();