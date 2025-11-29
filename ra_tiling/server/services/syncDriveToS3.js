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
exports.default = syncDriveToS3;
var driveService_ts_1 = require("./driveService.ts");
var imageService_ts_1 = require("./imageService.ts");
var a3Service_ts_1 = require("./a3Service.ts");
var fetchGalleryController_ts_1 = require("../controllers/fetchGalleryController.ts");
var promises_1 = require("fs/promises");
var path_1 = require("path");
var url_1 = require("url");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var downloadsDir = path_1.default.resolve(__dirname, "../downloads");
var optimisedDir = path_1.default.resolve(__dirname, "../optimised");
function normaliseFileName(fileName) {
    var base = String(fileName).replace(/\.[^/.]+$/, "");
    return base.replace(/-(mobile|tablet|desktop)$/, "");
}
var handleDownloads = function (files, normalizedS3Files) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, files_1, file, normalisedName, filePath, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[handleDownloads] files:", files);
                _i = 0, files_1 = files;
                _a.label = 1;
            case 1:
                if (!(_i < files_1.length)) return [3 /*break*/, 6];
                file = files_1[_i];
                normalisedName = normaliseFileName(file.name);
                if (normalizedS3Files.has(normalisedName)) {
                    console.log('[handleDownloads] Already present in s3, skipping', file.name);
                    return [3 /*break*/, 5];
                }
                filePath = path_1.default.join(downloadsDir, file.name);
                console.log("[handleDownloads] Attempting to save:", filePath);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, (0, driveService_ts_1.downloadFile)(file.id, filePath)];
            case 3:
                _a.sent();
                console.log('[handleDownloads] Download successful:', file.name);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.error("[handleDownloads] Download failed for", file.name, err_1);
                return [3 /*break*/, 5];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); };
var handleDeletions = function (deletions) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[handleDeletions] Deletions:", deletions);
                return [4 /*yield*/, (0, a3Service_ts_1.deleteFromS3)(deletions)];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, imageService_ts_1.deleteImages)(optimisedDir, deletions)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, imageService_ts_1.deleteImages)(downloadsDir, deletions)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var handleResponsive = function (files, normalizedS3Files) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, files_2, file, normalisedName, filePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[handleResponsive] files:", files);
                _i = 0, files_2 = files;
                _a.label = 1;
            case 1:
                if (!(_i < files_2.length)) return [3 /*break*/, 4];
                file = files_2[_i];
                normalisedName = normaliseFileName(file.name);
                if (normalizedS3Files.has(normalisedName)) {
                    console.log('[handleResponsive] Already present in s3, skipping responsive creation', file.name);
                    return [3 /*break*/, 3];
                }
                filePath = path_1.default.join(downloadsDir, file.name);
                console.log('[handleResponsive] Creating responsive images for:', filePath);
                return [4 /*yield*/, (0, imageService_ts_1.createResponsiveImages)(filePath, optimisedDir, normalisedName)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
var handleUploads = function (finalImages, normalizedS3Files) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, finalImages_1, imageName, normalizedImageName, imagePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[handleUploads] finalImages:", finalImages);
                _i = 0, finalImages_1 = finalImages;
                _a.label = 1;
            case 1:
                if (!(_i < finalImages_1.length)) return [3 /*break*/, 6];
                imageName = finalImages_1[_i];
                normalizedImageName = normaliseFileName(imageName);
                if (normalizedS3Files.has(normalizedImageName)) {
                    console.log('[handleUploads] Already present in s3, skipping upload:', imageName);
                    return [3 /*break*/, 5];
                }
                imagePath = path_1.default.join(optimisedDir, imageName);
                console.log('[handleUploads] Uploading to S3:', imagePath, 'as', imageName);
                return [4 /*yield*/, (0, a3Service_ts_1.uploadToS3)(imagePath, imageName)];
            case 2:
                _a.sent();
                // Delete from the optimised folder once uploaded
                return [4 /*yield*/, (0, imageService_ts_1.deleteImages)(downloadsDir, [imageName])];
            case 3:
                // Delete from the optimised folder once uploaded
                _a.sent();
                return [4 /*yield*/, (0, imageService_ts_1.deleteImages)(optimisedDir, [imageName])];
            case 4:
                _a.sent();
                console.log('[handleUploads] Deleted local copies of:', imageName);
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); };
function syncDriveToS3() {
    return __awaiter(this, arguments, void 0, function (optimisedDirectory) {
        var files, s3Files, deletions, normalizedS3Files, finalImages;
        if (optimisedDirectory === void 0) { optimisedDirectory = optimisedDir; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("[syncDriveToS3] Starting sync...");
                    return [4 /*yield*/, (0, driveService_ts_1.listFiles)("1h9itLF-gu_Bl2zHtBPB_HPy-HhAtW6S-")];
                case 1:
                    files = _a.sent();
                    console.log("[syncDriveToS3] Drive files:", files);
                    return [4 /*yield*/, (0, a3Service_ts_1.lists3Files)()];
                case 2:
                    s3Files = _a.sent();
                    console.log("[syncDriveToS3] S3 files:", s3Files);
                    return [4 /*yield*/, (0, driveService_ts_1.detectDeletions)(s3Files, files)];
                case 3:
                    deletions = _a.sent();
                    console.log("[syncDriveToS3] Deletions to process:", deletions);
                    normalizedS3Files = new Set();
                    s3Files.forEach(function (s3File) { return normalizedS3Files.add(normaliseFileName(s3File)); });
                    console.log("[syncDriveToS3] Normalized S3 files:", normalizedS3Files);
                    if (!(deletions && deletions.length > 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, handleDeletions(deletions)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, handleDownloads(files, normalizedS3Files)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, handleResponsive(files, normalizedS3Files)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, promises_1.default.readdir(optimisedDirectory)];
                case 8:
                    finalImages = _a.sent();
                    console.log("[syncDriveToS3] Images ready for upload:", finalImages);
                    return [4 /*yield*/, handleUploads(finalImages, normalizedS3Files)];
                case 9:
                    _a.sent();
                    (0, fetchGalleryController_ts_1.invalidateGalleryCache)();
                    console.log("[syncDriveToS3] Sync complete.");
                    return [2 /*return*/];
            }
        });
    });
}
;
syncDriveToS3(optimisedDir);
