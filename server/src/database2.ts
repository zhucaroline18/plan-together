//import path from 'path';
import {Database} from 'sqlite3';
//import express from 'express';


const db = new Database ('db.sqlite');

db.get(
    'SELECT RANDOM() % 100 as result',
    (_, res) => console.log(res)
);

