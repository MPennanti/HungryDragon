(function () {
    "use strict";

    module.exports = {
        content: {
            files: [{
                expand: true,
                cwd: "src/html",
                src: ["**"],
                dest: "dist/"
            }]
        }
    };
})();