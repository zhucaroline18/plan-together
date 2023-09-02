import express from 'express';
import bodyParser from 'body-parser';
import * as db from './database';
import { addGroupItem, addMember, addNewCost, addVolunteer, archive, createTrip, createUser, getAllArchivedTrips, getAllExpense, getAllGroupItems, getAllInvitedTrips, getAllMembers, getAllTrips, getAllVolunteers, getDetails, getMemberStatus, hasUser, isValid, isValid2, joinTrip, removeCost, removeItem, removeMember, removeVolunteer, unarchive, updateAdditionalDetails, updateAllDetails, updateDate, updateDestination, updateGroupPack } from './routes';

import path from 'path';

// Configure and start the HTTP server.
const port = 8080;
const app = express();
app.use(bodyParser.json());

const clientFileDir = path.join(__dirname, '../clientbuild');
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
app.get("/api/all-trip-data", async(req, res)=>{
    const rows = await db.getAllDataTrips();
    res.json(rows);
})
app.get("/api/all-member-data", async (req, res) => {
    const rows = await db.getAllDataMembers();
    res.json(rows);
})
app.get("/api/all-cost-data", async (req, res) => {
    const rows = await db.getAllDataCosts();
    res.json(rows);
})
app.get("/api/all-group-item-data", async (req, res) => {
    const rows = await db.getAllDataGroupItem();
    res.json(rows);
})
app.get("/api/all-volunteer-data", async (req, res) => {
    const rows = await db.getAllDataVolunteers();
    res.json(rows);
})

app.get("/api/is-valid", isValid);
app.get("/api/get-user-id", isValid2);
app.get("/api/get-all-trips", getAllTrips);
app.get("/api/get-details", getDetails);
app.get("/api/get-all-members", getAllMembers);
app.get("/api/get-all-invited-trips", getAllInvitedTrips);
app.get("/api/get-member-status", getMemberStatus)
app.get("/api/get-all-costs", getAllExpense)
app.get("/api/get-all-group-items", getAllGroupItems)
app.get("/api/get-all-volunteers", getAllVolunteers)
app.get("/api/get-all-archived-trips", getAllArchivedTrips)
app.get("/api/has-user", hasUser)


app.post("/api/create-user", createUser);
app.post("/api/join-trip", joinTrip);
app.post("/api/create-trip", createTrip);
app.post("/api/set-details", updateAdditionalDetails);
app.post("/api/set-date", updateDate);
app.post("/api/set-destination", updateDestination);
app.post("/api/set-group-pack", updateGroupPack);
app.post("/api/add-cost", addNewCost);
app.post("/api/set-all", updateAllDetails);
app.post("/api/remove-cost", removeCost);
app.post("/api/remove-item", removeItem);
app.post("/api/remove-volunteer", removeVolunteer);
app.post("/api/add-member", addMember);
app.post("/api/remove-member", removeMember);
app.post("/api/archive", archive);
app.post("/api/unarchive", unarchive);
app.post("/api/add-group-item", addGroupItem)
app.post("/api/add-volunteer", addVolunteer)



app.listen(port, () => console.log(`Server listening on ${port}`));