const serverless = require("serverless-http");
const app = require("../../backend/server");

const handler = serverless(app);

exports.handler = async (event, context) => {
    if (event.body && typeof event.body !== "string") {
        event.body = Buffer.from(event.body).toString("utf8");
    }

    return handler(event, context);
};