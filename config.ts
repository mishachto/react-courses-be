// dev, qa, uat, prod
require("dotenv").config()

require('dotenv').config()

interface IConfigSettings {
    host: string;
    user: string;
    port: string | number;
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
        host: "ec2-54-73-110-26.eu-west-1.compute.amazonaws.com",
        database: "d3p2etlvl7e8gr",
        user:     'uhedcqwspchslt',
        password: '5f2e1d6f25813353eb468405fe1c4c1f43f4fa8d984546ee6016d6efea95b651',
        port: 5432,
        SECRET_KEY: "asd23j34jf983jfoiqwej98d342q09gfqkw"
    },
    uat: {
        host: "ec2-54-73-110-26.eu-west-1.compute.amazonaws.com",
        database: "d3p2etlvl7e8gr",
        user:     'uhedcqwspchslt',
        password: '5f2e1d6f25813353eb468405fe1c4c1f43f4fa8d984546ee6016d6efea95b651',
        port: 5432,
        SECRET_KEY: "asd23j34jf983jfoiqwej98d342q09gfqkw"
    },
    prod: {
        host: "ec2-54-73-110-26.eu-west-1.compute.amazonaws.com",
        database: "d3p2etlvl7e8gr",
        user:     'uhedcqwspchslt',
        password: '5f2e1d6f25813353eb468405fe1c4c1f43f4fa8d984546ee6016d6efea95b651',
        port: 5432,
        SECRET_KEY: "asd23j34jf983jfoiqwej98d342q09gfqkw"
    }
}

export default config[process.env.NODE_ENV || "dev"]