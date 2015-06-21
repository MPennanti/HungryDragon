(function () {
    "use strict";

    module.exports = {
        test: {
            src: ["dist/app/test/**/*.test.js"],
            options: {
                reporter: 'spec'
            }
        }
    };
})();
