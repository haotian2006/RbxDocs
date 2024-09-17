"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spliceHtml = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var cheerio_1 = require("cheerio");
var __dirname = "src/modules/mdimg/src";
var spliceHtml = function (_a) {
    var inputHtml = _a.inputHtml,
        htmlText = _a.htmlText,
        cssText = _a.cssText,
        htmlTemplate = _a.htmlTemplate,
        cssTemplate = _a.cssTemplate,
        log = _a.log;
    var _htmlSource = htmlText;
    var _cssSource = cssText;
    if (!_htmlSource) {
        var _htmlPath = (0, path_1.resolve)(
            __dirname,
            "../template/html",
            "".concat(htmlTemplate, ".html"),
        );
        try {
            (0, fs_1.accessSync)(_htmlPath, fs_1.constants.R_OK);
        } catch (err) {
            if (log) {
                process.stderr.write(
                    "Warning: HTML template "
                        .concat(
                            _htmlPath,
                            " is not found or unreadable. Use default HTML template.\n",
                        )
                        .concat(err, "\n"),
                );
            }
            _htmlPath = (0, path_1.resolve)(__dirname, "../template/html/default.html");
        }
        _htmlSource = (0, fs_1.readFileSync)(_htmlPath).toString();
    }
    if (!_cssSource) {
        var _cssPath = (0, path_1.resolve)(
            __dirname,
            "../template/css",
            "".concat(cssTemplate, ".css"),
        );
        try {
            (0, fs_1.accessSync)(_cssPath, fs_1.constants.R_OK);
        } catch (err) {
            if (log) {
                process.stderr.write(
                    "Warning: CSS template "
                        .concat(
                            _cssPath,
                            " is not found or unreadable. Use default CSS template.\n",
                        )
                        .concat(err, "\n"),
                );
            }
            _cssPath = (0, path_1.resolve)(__dirname, "../template/css/default.css");
        }
        _cssSource = (0, fs_1.readFileSync)(_cssPath).toString();
    }
    var $ = (0, cheerio_1.load)(_htmlSource);
    $(".markdown-body").html(inputHtml);
    var _html =
        '\n  <!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>mdimg</title>\n    <style>\n      '
            .concat(_cssSource, "\n    </style>\n  </head>\n  <body>\n    ")
            .concat($.html(), "\n  </body>\n  </html>");
    return _html;
};
exports.spliceHtml = spliceHtml;
