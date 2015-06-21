(function () {
    "use strict";

    module.exports = function (grunt) {
        // Helper function to load the config file for each plugin
        function loadConfig(path) {
            var glob = require("glob");
            var object = {};

            glob.sync("*.js", { cwd: path }).forEach(function (option) {
                var key = option.replace(/\.js$/, "");
                var value = require(path + option);
                if (typeof (value) === 'function') {
                    value = value(grunt);
                }
                object[key] = value;
            });

            return object;
        }

        // Load task options
        var gruntConfig = loadConfig("./tasks/options/");
        grunt.initConfig(gruntConfig);

        // Load all grunt-tasks in package.json
        require("load-grunt-tasks")(grunt);

        grunt.registerTask("default", ["clean", "ts", "browserify", "copy", "less", "lint", "test"]);
        grunt.registerTask("lint", ["tslint"]);
        grunt.registerTask("test", ["mochaTest"]);
        grunt.registerTask("coverage", ["default", "mocha_istanbul"]);
        grunt.registerTask("ci", ["coverage", "coveralls"]);
    };

})();