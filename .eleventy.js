const pluginSass = require('eleventy-plugin-sass')

module.exports = function(config) {
    const sassPluginOptions = {
        watch: ['./src/sass/**/*.scss']
    }
    config.addPlugin(pluginSass, sassPluginOptions);
    config.addPassthroughCopy('./src/assets');

    return {
        dir: {
            input: "./src",
            output: "dist",
            layouts: "_layouts"
        },
        templateFormats: ["html", "md"],
        htmlTemplateEngine: "liquid",
        markdownTemplateEngine: "liquid",
    };
}