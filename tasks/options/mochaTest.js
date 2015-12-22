(function () {
    "use strict";

    module.exports = {
        test: {
            src: ["dist/app/**/*.test.js"],
            options: {
                reporter: 'spec'
            }
        }
    };
})();
