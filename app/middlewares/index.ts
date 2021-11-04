import * as cors from "koa2-cors";
import * as bodyParser from "koa-bodyparser";
import corsOptions from "./cors.options";
import bodyParserOptions from "./bodyparser.options";
import respondOptions from "./respond.options";
// @ts-ignore
import * as respond from "koa-respond";
// @ts-ignore
import { compose } from "koa-convert";
// @ts-ignore
import * as responseTime from "koa-response-time";
import errorHandler from "./errorHandler";

const commonMiddlewares = () =>
  compose([
    cors(corsOptions),
    responseTime(),
    bodyParser(bodyParserOptions),

    respond(respondOptions),
    errorHandler
  ]);

export { commonMiddlewares };
