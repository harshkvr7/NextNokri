import pg from "pg";

export const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "NextNokri",
    password: "Harshkvr@2005",
    port: 5432,
});