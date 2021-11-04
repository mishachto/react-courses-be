"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEB_SERVER_SETTINGS = void 0;
require('dotenv').config();
exports.WEB_SERVER_SETTINGS = {
    PORT: process.env.PORT || 4000
};
// module.exports = {
//     WEB_SERVER_SETTINGS
// }
