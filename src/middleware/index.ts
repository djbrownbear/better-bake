import { thunk } from "redux-thunk";
import logger from "./logger";
import { applyMiddleware } from "redux";

const myMiddleware: any[] = [thunk];

if (process.env.NODE_ENV !== 'production') {
  myMiddleware.push(logger);
}

export default applyMiddleware(...myMiddleware);