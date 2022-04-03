import http, { RequestOptions } from "http";
import https from "https";
import fs from "fs";
import path from "path";
import request from "request";

const data: Array<any> = [];

interface DataEmitOptions {
    injectMutation: boolean;
    includeData: boolean;
}

async function postData(x: number, y: number, options: DataEmitOptions) {

    const filePath: string = path.join(__dirname, "../", "data", "uniform", "pixelHistoryExecution.destiny");

    const pixelHistoryExecutionCode = fs.readFileSync(filePath, {encoding: "utf-8"});

    const requestOptions: RequestOptions = {
        host: "gql-realtime-2.reddit.com",
        path: "/query",
        method: "POST",
        auth: "bruh",
        headers: {
            "Content-Type": "application/json",
            "authorization": "bruh"
        }
    }

    // const request = https.request()
}

postData(100, 100, {
    injectMutation: true,
    includeData: true
});