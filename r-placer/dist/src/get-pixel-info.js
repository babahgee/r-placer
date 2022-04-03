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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const data = [];
function postData(x, y, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, "../", "data", "uniform", "pixelHistoryExecution.destiny");
        const pixelHistoryExecutionCode = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
        const requestOptions = {
            host: "gql-realtime-2.reddit.com",
            path: "/query",
            method: "POST",
            auth: "bruh",
            headers: {
                "Content-Type": "application/json",
                "authorization": "bruh"
            }
        };
        // const request = https.request()
    });
}
postData(100, 100, {
    injectMutation: true,
    includeData: true
});
