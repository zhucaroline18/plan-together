import express from 'express';

const app = express();
app.get("/", (req, res) => {

    res.json([1,2,3]);
});

app.listen(8080, () => {
    console.log("here");
});

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS mytest");
    db.run("CREATE TABLE mytest(address TEXT, state INT)");
    db.run("INSERT INTO mytest(address, state) VALUES ('bellevue', 10)");
    db.run("INSERT INTO mytest(address, state) VALUES ('seattle', 11)");
    db.each("SELECT address, state FROM mytest WHERE state = 11", (err, row) => {
        console.log(row.address);
    });
});

db.close();