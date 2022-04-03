import "colors";

import fs from "fs";
import path from "path";
import url from "url";

import { createCanvas, CanvasRenderingContext2D, Canvas, loadImage, Image } from "canvas";

// ========== Interfaces inluding mappings and keys ==========

interface ColorMap {
    readonly [color: string]: Array<number>;
}


// ========== Pre-defined variables ==========

const colorData: ColorMap = JSON.parse(fs.readFileSync(path.join(__dirname, "../", "data", "dataset", "colors.json"), { encoding: "utf-8" }));
const foundColors: { [key: string]: number } = { };

for (let key in colorData) foundColors[key] = 0;

// ========== Functions ==========

function exit(message?: string) {

    typeof message === "string" ? console.log(message.red) : null;

    process.exit();
}


// ========== Main process ==========
(async process => {

    const processArguments: Array<string> = process.argv;

    if (processArguments.length !== 6) return exit("Failed to execute program. No required arguments has been given: [filePath] [colorName] [colorReplacement] [outPath]");

    const imagePath: string = processArguments[2];
    const colorName: string = processArguments[3];
    const colorReplacement: string = typeof processArguments[4] === "string" ? processArguments[4] : "transparent";
    const outPath: string = processArguments[5];


    if (!fs.existsSync(imagePath)) return exit(`Failed to execute program. Image path '${imagePath}' does not exist.`);
    if (!fs.existsSync(outPath)) return exit(`Failed to execute program. Image path '${imagePath}' does not exist.`);
    if (!(colorData[colorName] instanceof Array) && colorName !== "all") return exit(`The given color name '${colorName}' does not exist.`);





    const canvas: Canvas = createCanvas(2000, 1000);
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    const image: Image = await loadImage(imagePath);

    
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < imageData.data.length; i += 4) {

        const data: Uint8ClampedArray = imageData.data,
            color: Array<number> = colorData[colorName];

        const r: number = data[i],
            g: number = data[i + 1],
            b: number = data[i + 2],
            alpha: number = data[i + 3];

        switch (colorName) {
            case "all":

                for (let key in colorData) {

                    const c: Array<number> = colorData[key];

                    if (r === c[0] && g === c[1] && b === c[2]) foundColors[key] += 1;
                }


                break;
            default:

                if (r === color[0] && g === color[1] && b === color[2]) foundColors[colorName] += 1;

                break;
        }


    }

    fs.writeFileSync(path.join(outPath, Date.now() + ".json"), JSON.stringify(foundColors, null, 1), {encoding: "utf-8"});


    function filter(color?: string) {



    }


})(process);