import { ConnectionConfig } from "mariadb";

const {
  DB_USER,
  DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
} = process.env;

const connectionOptions: ConnectionConfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE,
  host: DB_HOST,
  port: new Number(DB_PORT).valueOf(),
  dateStrings: true,
  insertIdAsNumber: true,
}

export {
  connectionOptions
};