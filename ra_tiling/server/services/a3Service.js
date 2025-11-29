"use strict";
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
exports.s3 = void 0;
exports.uploadToS3 = uploadToS3;
exports.lists3Files = lists3Files;
exports.deleteFromS3 = deleteFromS3;
var client_s3_1 = require("@aws-sdk/client-s3");
var fs_1 = require("fs");
var url_1 = require("url");
var path_1 = require("path");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var dotenv_1 = require("dotenv");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") }); // loads server/.env
if (!process.env.AWS_ACCESS_KEY || !process.env.AWS_SECRET_KEY)
    throw new Error('Missing AWS .env variables');
/**
 * AWS bucket credentials
 */
exports.s3 = new client_s3_1.S3Client({
    region: "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});
/**
 *
 * @param {*} localPath - String path to the image
 * @param {*} key - String key value used as name in the bucket
 */
function uploadToS3(localPath, key) {
    return __awaiter(this, void 0, void 0, function () {
        var fileStream;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileStream = fs_1.default.createReadStream(localPath);
                    return [4 /*yield*/, exports.s3.send(new client_s3_1.PutObjectCommand({
                            Bucket: "ra-tiling-bucket",
                            Key: key,
                            Body: fileStream,
                        }))];
                case 1:
                    _a.sent();
                    console.log("Uploaded:".concat(key));
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Gets files from the s3 bucket
 * @returns An array of file key names from the S3 bucket
 */
function lists3Files() {
    return __awaiter(this, void 0, void 0, function () {
        var command, response;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    command = new client_s3_1.ListObjectsV2Command({
                        Bucket: "ra-tiling-bucket"
                    });
                    return [4 /*yield*/, exports.s3.send(command)];
                case 1:
                    response = _b.sent();
                    // Map array of file objects to just their keys
                    console.log("default response ".concat(Object.entries(response)));
                    // Ensure key is of type string
                    return [2 /*return*/, ((_a = response.Contents) === null || _a === void 0 ? void 0 : _a.map(function (obj) { return obj.Key; }).filter(function (key) { return !!key; })) || []];
            }
        });
    });
}
;
/**
 * Deletes files associated with the input keys from the S3 bucket
 * @param {*} keys - An array of file key names from the S3 bucket
 */
function deleteFromS3(keys) {
    return __awaiter(this, void 0, void 0, function () {
        var command, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Keys to delete ".concat(keys));
                    command = new client_s3_1.DeleteObjectsCommand({
                        Bucket: "ra-tiling-bucket",
                        Delete: {
                            Objects: keys.map(function (key) { return ({ Key: key }); })
                        }
                    });
                    return [4 /*yield*/, exports.s3.send(command)];
                case 1:
                    response = _a.sent();
                    if (response.Deleted && response.Deleted.length > 0) {
                        console.log('Successful deletion:', response.Deleted.map(function (obj) { return obj.Key; }));
                    }
                    else {
                        console.log('No files deleted or unsuccessful');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
