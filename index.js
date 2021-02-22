"use strict";
exports.__esModule = true;
var fs = require("fs");
function readDir(path) {
    try {
        return fs.readdirSync(path);
    }
    catch (err) {
        throw new Error(err.toString());
    }
}
exports.readDir = readDir;
function readJSONFile(path) {
    try {
        if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
            var data = fs.readFileSync(path, "utf8");
            try {
                return JSON.parse(data);
            }
            catch (err) {
                throw new Error("Error parsing json.. ");
            }
        }
        else {
            console.log("file: '" + path + "' not found..");
        }
    }
    catch (err) {
        throw new Error(err.toString());
    }
}
exports.readJSONFile = readJSONFile;
var mioStrings = ["IM", "ZB", "MR"];
exports.mioStrings = mioStrings;
function getExamples(mio, type, valid) {
    if (valid === void 0) { valid = true; }
    var rootPath = "/data/" + type + "/" + mio + (valid ? "" : "/error");
    var files = readDir(rootPath).map(function (file) { return rootPath + "/" + file; });
    var results = [];
    files.forEach(function (file) {
        if (fs.lstatSync(file).isFile())
            results.push(file);
    });
    return results;
}
exports.getExamples = getExamples;
function getExample(fileName, rootPath) {
    if (rootPath === void 0) { rootPath = "/data"; }
    var files = readDir(rootPath).map(function (file) { return rootPath + "/" + file; });
    files.forEach(function (file) {
        var stats = fs.lstatSync(file);
        if (stats.isFile()) {
            if (file === fileName)
                return file;
        }
        else {
            if (stats.isDirectory())
                return getExample(rootPath + "/" + file);
        }
    });
    return undefined;
}
exports.getExample = getExample;
var example = getExample("no-profile.json");
console.log(example);
