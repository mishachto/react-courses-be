// dev, qa, uat, prod
require("dotenv").config()

require('dotenv').config()

interface IConfigSettings {
    host: string;
    user: string;
    port: string;
    password: string;
    database: string;
    SECRET_KEY: string;
}

interface IConfig {
    [key: string]: IConfigSettings
}

const config: IConfig = {
    dev: {
        host: "localhost",
        user: "postgres",
        password: "solonyna22",
        port: "5432",
        database: "todosBD",
        SECRET_KEY: "asd23j34jf983jfoiqwej98d342q09gfqkw"
    },
    qa: {
        host: "",
        user: "",
        password: "",
        port: "",
        database: "",
        SECRET_KEY: "asd23j34jf983jfoiqwej98d342q09gfqkw"
    },
    uat: {
        host: "",
        user: "",
        password: "",
        port: "",
        database: "",
        SECRET_KEY: "asd23j34jf983jfoiqwej98d342q09gfqkw"
    },
    prod: {
        host: "",
        user: "",
        password: "",
        port: "",
        database: "",
        SECRET_KEY: "asd23j34jf983jfoiqwej98d342q09gfqkw"
    }
}

export default config[process.env.NODE_ENV || "dev"]