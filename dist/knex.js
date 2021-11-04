"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("knex");
const pg = require("pg");
const objection_1 = require("objection");
const knexConfig = require("../knexfile");
objection_1.Model.knex(knexConfig);
const knexConnection = (0, knex_1.default)(knexConfig);
knexConnection
    .raw("select 1+1 as result")
    .then(() => {
    console.log(`Connection successfully completed`);
})
    .catch((err) => console.log(`Connection error:`, err));
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
    return parseFloat(value);
});
const knexInstance = (0, knex_1.default)(knexConfig);
knexInstance.migrate.latest()
    .then(res => console.log('Migrations OK', res))
    .catch(err => console.log('Migrations error', err));
knexInstance.seed.run()
    .then(res => console.log('Seeds OK', res))
    .catch(err => console.log('Migrations error', err));
exports.default = knexInstance;
