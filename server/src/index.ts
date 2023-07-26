import express from 'express';
import bodyParser from 'body-parser';
import * as db from './database';
import { addMember, addNewCost, createTrip, createUser, removeCost, removeMember, updateAdditionalDetails, updateDate, updateDestination, updateGroupPack } from './routes';

import path from 'path';

// Configure and start the HTTP server.
const port = 8080;
const app = express();
app.use(bodyParser.json());

const clientFileDir = path.join(__dirname, '../../client/build');
console.log(`clientFileDir=${clientFileDir}`);
app.use(express.static(clientFileDir));


app.get("/api/names", async (req, res)=>{
    const rows = await db.getNames();
    res.json(rows);
});
app.get("/api/emails", async (req, res)=>{
    const rows = await db.getEmails();
    res.json(rows);
});
app.get("/api/passwords", async (req, res)=>{
    const rows = await db.getPasswords();
    res.json(rows);
});
app.get("/api/getid", async (req, res)=>{
    const rows = await db.getId();
    res.json(rows);
});
app.get("/api/all", async (req, res)=>{
    const rows = await db.getAllDataUsers();
    res.json(rows);
});
app.get("/api/getcarolinepassword", async (req, res)=>{
    const rows = await db.isValid("z", "s#170043");
    res.json(rows);
});
app.post("/api/create-user", createUser);
app.post("/api/create-trip", createTrip);
app.post("/api/set-details", updateAdditionalDetails);
app.post("/api/set-date", updateDate);
app.post("/api/set-destination", updateDestination);
app.post("/api/set-group-pack", updateGroupPack);
app.post("/api/add-cost", addNewCost);
app.post("/api/remove-cost", removeCost);
app.post("/api/add-member", addMember);
app.post("/api/remove-member", removeMember);

app.listen(port, () => console.log(`Server listening on ${port}`));