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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const canvas_1 = require("canvas");
// ========== Pre-defined variables ==========
const colorData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../", "data", "dataset", "colors.json"), { encoding: "utf-8" }));
const foundColors = {};
for (let key in colorData)
    foundColors[key] = 0;
// ========== Functions ==========
function exit(message) {
    typeof message === "string" ? console.log(message.red) : null;
    process.exit();
}
// ========== Main process ==========
((process) => __awaiter(void 0, void 0, void 0, function* () {
    const processArguments = process.argv;
    if (processArguments.length !== 6)
        return exit("Failed to execute program. No required arguments has been given: [filePath] [colorName] [colorReplacement] [outPath]");
    const imagePath = processArguments[2];
    const colorName = processArguments[3];
    const colorReplacement = typeof processArguments[4] === "string" ? processArguments[4] : "transparent";
    const outPath = processArguments[5];
    if (!fs_1.default.existsSync(imagePath))
        return exit(`Failed to execute program. Image path '${imagePath}' does not exist.`);
    if (!fs_1.default.existsSync(outPath))
        return exit(`Failed to execute program. Image path '${imagePath}' does not exist.`);
    if (!(colorData[colorName] instanceof Array) && colorName !== "all")
        return exit(`The given color name '${colorName}' does not exist.`);
    const canvas = (0, canvas_1.createCanvas)(2000, 1000);
    const ctx = canvas.getContext("2d");
    const image = yield (0, canvas_1.loadImage)(imagePath);
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        const data = imageData.data, color = colorData[colorName];
        const r = data[i], g = data[i + 1], b = data[i + 2], alpha = data[i + 3];
        switch (colorName) {
            case "all":
                for (let key in colorData) {
                    const c = colorData[key];
                    if (r === c[0] && g === c[1] && b === c[2])
                        foundColors[key] += 1;
                }
                break;
            default:
                if (r === color[0] && g === color[1] && b === color[2])
                    foundColors[colorName] += 1;
                break;
        }
    }
    fs_1.default.writeFileSync(path_1.default.join(outPath, Date.now() + ".json"), JSON.stringify(foundColors, null, 1), { encoding: "utf-8" });
    function filter(color) {
    }
}))(process);
