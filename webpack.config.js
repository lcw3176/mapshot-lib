var path = require("path");

module.exports = {
    mode: "production", 
    entry: "./mapshot.latest.js", 
    output: { 
        filename: "mapshot.latest.js", 
        path: path.resolve(__dirname, "dist") 
    }
};

