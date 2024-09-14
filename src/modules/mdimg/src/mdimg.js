"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert2img = exports.mdimg = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var puppeteer_1 = require("puppeteer");
var mdParser_1 = require("./utils/mdParser");
var htmlSplicer_1 = require("./utils/htmlSplicer");
var mdimg = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var _outputFileTypes, _encodingTypes, _result, _input, _inputFilename, _inputText, _inputFilePath, _encoding, _saveToDisk, _type, _output, _outputFilename, _outputFilePath, _outputFilenameArr, _outputFilenameArrLength, _outputFileType, _quality, _html, _c, _browser, _page, _body, _outputBlob, _outputBase64String;
    var _d;
    var inputText = _b.inputText, inputFilename = _b.inputFilename, mdText = _b.mdText, mdFile = _b.mdFile, outputFilename = _b.outputFilename, _e = _b.type, type = _e === void 0 ? "png" : _e, _f = _b.width, width = _f === void 0 ? 800 : _f, _g = _b.height, height = _g === void 0 ? 600 : _g, _h = _b.encoding, encoding = _h === void 0 ? "binary" : _h, _j = _b.quality, quality = _j === void 0 ? 100 : _j, htmlText = _b.htmlText, cssText = _b.cssText, _k = _b.htmlTemplate, htmlTemplate = _k === void 0 ? "default" : _k, _l = _b.cssTemplate, cssTemplate = _l === void 0 ? "default" : _l, _m = _b.log, log = _m === void 0 ? false : _m, _o = _b.puppeteerProps, puppeteerProps = _o === void 0 ? {} : _o;
    return __generator(this, function (_p) {
        switch (_p.label) {
            case 0:
                _outputFileTypes = ["jpeg", "png", "webp"];
                _encodingTypes = ["base64", "binary", "blob"];
                _result = {
                    html: "",
                    data: encoding === "base64" ? "" : Uint8Array.from([]),
                    path: undefined,
                };
                _input = "";
                _inputFilename = inputFilename || mdFile;
                _inputText = inputText || mdText;
                if (_inputFilename) {
                    _inputFilePath = (0, path_1.resolve)(_inputFilename);
                    if ((0, fs_1.existsSync)(_inputFilePath)) {
                        if ((0, fs_1.statSync)(_inputFilePath).isFile()) {
                            _input = (0, fs_1.readFileSync)(_inputFilePath).toString();
                            if (log) {
                                process.stderr.write("Info: start to convert file ".concat(_inputFilePath, " to an image...\n"));
                            }
                        }
                        else {
                            throw new Error("Error: input is not a file.\n");
                        }
                    }
                    else {
                        throw new Error("Error: input file ".concat(_inputFilePath, " is not exists.\n"));
                    }
                }
                else if (_inputText) {
                    _input = _inputText;
                    if (log) {
                        process.stderr.write("Info: start to convert text to an image...\n");
                    }
                }
                else {
                    throw new Error("Error: text or file is required to be converted.\n");
                }
                _encoding = encoding;
                _saveToDisk = _encoding === "binary";
                if (!_encodingTypes.includes(_encoding)) {
                    // Params encoding is not valid
                    throw new Error("Error: encoding type ".concat(_encoding, " is not supported. Valid types: ").concat(_encodingTypes.join(", "), ".\n"));
                }
                _type = type;
                if (!_outputFileTypes.includes(_type)) {
                    // Params encoding is not valid
                    throw new Error("Error: output file type ".concat(_type, " is not supported. Valid types: ").concat(_outputFileTypes.join(", "), ".\n"));
                }
                _output = "";
                if (_saveToDisk) {
                    if (outputFilename) {
                        _outputFilename = (0, path_1.basename)(outputFilename);
                        _outputFilePath = (0, path_1.dirname)(outputFilename);
                        _outputFilenameArr = _outputFilename.split(".");
                        _outputFilenameArrLength = _outputFilenameArr.length;
                        if (_outputFilenameArrLength <= 1) {
                            // Output file type is not specified
                            _output = (0, path_1.resolve)(_outputFilePath, "".concat(_outputFilename, ".").concat(_type));
                        }
                        else {
                            _outputFileType = _outputFilenameArr[_outputFilenameArrLength - 1];
                            if (_outputFileTypes.includes(_outputFileType)) {
                                // Option type is overridden
                                _type = _outputFileType;
                                _output = (0, path_1.resolve)(outputFilename);
                            }
                            else {
                                // Output file type is wrongly specified
                                if (log) {
                                    process.stderr.write("Warning: output file type must be one of 'jpeg', 'png' or 'webp'. Use '".concat(_type, "' type.\n"));
                                }
                                _output = (0, path_1.resolve)(_outputFilePath, "".concat(_outputFilename, ".").concat(_type));
                            }
                        }
                    }
                    else {
                        _output = (0, path_1.resolve)("mdimg_output", _generateImageFilename(_type));
                    }
                }
                if (_type !== "png") {
                    _quality = quality > 0 && quality <= 100 ? quality : 100;
                }
                _c = htmlSplicer_1.spliceHtml;
                _d = {};
                return [4 /*yield*/, (0, mdParser_1.parseMarkdown)(_input)];
            case 1:
                _html = _c.apply(void 0, [(_d.inputHtml = _p.sent(),
                        _d.htmlText = htmlText,
                        _d.cssText = cssText,
                        _d.htmlTemplate = _resolveTemplateName(htmlTemplate),
                        _d.cssTemplate = _resolveTemplateName(cssTemplate),
                        _d.log = log,
                        _d)]);
                _result.html = _html;
                return [4 /*yield*/, puppeteer_1.default.launch(__assign({ defaultViewport: {
                            width: width,
                            height: height,
                        }, args: ["--window-size=".concat(width, ",").concat(height)] }, puppeteerProps))];
            case 2:
                _browser = _p.sent();
                return [4 /*yield*/, _browser.newPage()];
            case 3:
                _page = _p.sent();
                return [4 /*yield*/, _page.setContent(_html, {
                        waitUntil: "networkidle0",
                    })];
            case 4:
                _p.sent();
                return [4 /*yield*/, _page.$("#mdimg-body")];
            case 5:
                _body = _p.sent();
                if (!_body) return [3 /*break*/, 11];
                if (!(_encoding === "binary" || _encoding === "blob")) return [3 /*break*/, 7];
                if (_saveToDisk) {
                    // Create empty output file
                    _createEmptyFile(_output);
                }
                return [4 /*yield*/, _body.screenshot({
                        path: _saveToDisk ? _output : undefined,
                        type: _type,
                        quality: _quality,
                        encoding: "binary",
                    })];
            case 6:
                _outputBlob = _p.sent();
                if (log) {
                    process.stderr.write("Info: convert to image".concat(_saveToDisk ? " and saved as ".concat(_output) : "", " successfully!\n"));
                }
                _result.data = _outputBlob;
                _result.path = _saveToDisk ? _output : undefined;
                return [3 /*break*/, 9];
            case 7:
                if (!(_encoding === "base64")) return [3 /*break*/, 9];
                return [4 /*yield*/, _body.screenshot({
                        type: _type,
                        quality: _quality,
                        encoding: "base64",
                    })];
            case 8:
                _outputBase64String = _p.sent();
                if (log) {
                    process.stderr.write("Info: convert to BASE64 encoded string successfully!\n");
                }
                _result.data = _outputBase64String;
                _p.label = 9;
            case 9: return [4 /*yield*/, _browser.close()];
            case 10:
                _p.sent();
                return [2 /*return*/, _result];
            case 11: return [4 /*yield*/, _browser.close()];
            case 12:
                _p.sent();
                throw new Error("Error: missing HTML element with id: mdimg-body.\nHTML template ".concat(htmlTemplate, " is not valid.\n"));
        }
    });
}); };
exports.mdimg = mdimg;
exports.convert2img = mdimg;
function _resolveTemplateName(templateName) {
    var _templateName = templateName.split(".")[0];
    return _templateName;
}
function _createEmptyFile(filename) {
    var _filePath = (0, path_1.dirname)(filename);
    try {
        (0, fs_1.mkdirSync)(_filePath, { recursive: true });
        (0, fs_1.writeFileSync)(filename, "");
    }
    catch (error) {
        throw new Error("Error: create new file ".concat(filename, " failed.\n").concat(String(error), "\n"));
    }
}
function _generateImageFilename(type) {
    var _now = new Date();
    var _outputFilenameSuffix = "".concat(_now.getFullYear(), "_").concat(_now.getMonth() + 1, "_").concat(_now.getDate(), "_").concat(_now.getHours(), "_").concat(_now.getMinutes(), "_").concat(_now.getSeconds(), "_").concat(_now.getMilliseconds());
    return "mdimg_".concat(_outputFilenameSuffix, ".").concat(type);
}
