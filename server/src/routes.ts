import {Request, Response} from "express";
import * as db from './database';



export async function isValid (req: Request, res: Response)
{
    const email = req.query.email;
    if (email === undefined || typeof email !== "string") {
        res.status(400).send("missing 'email' parameter");
        console.log("missing email parameter")
        return
      }
      
    const password = req.query.password;
    if (password === undefined || typeof password !== "string") {
        res.status(400).send("missing 'password' parameter");
        console.log("missing password parameter")
        return
      }
    const answer = await db.isValid(email, password);
    res.json(answer);

}

export async function hasUser(req: Request, res: Response)
{
    const email = req.query.email;
    if (email === undefined || typeof email !== "string") {
        res.status(400).send("missing 'email' parameter");
        console.log("missing email parameter")
        return
    }
    const answer = await db.hasEmail(email);
    res.json(answer);
}

export async function isValid2 (req: Request, res: Response)
{
    const email = req.query.email;
    if (email === undefined || typeof email !== "string") {
        res.status(400).send("missing 'email' parameter");
        console.log("missing email parameter")
        return
    }
    const answer = await db.isValid2(email);
    res.json(answer);
}

export async function getAllTrips (req: Request, res: Response ) {
    const userID = req.query.user_id;
    if (userID === undefined || typeof userID !== "string") {
        console.log(userID)
        console.log(typeof(userID))
        res.status(400).send("missing 'userID' parameter");
        console.log("missing userID parameter")
        return 
    }
    const id = parseInt(userID);
    const trips = await db.getAllTrips(id);
    res.json(trips);
}
export async function getAllArchivedTrips (req: Request, res: Response ) {
    const userID = req.query.user_id;
    if (userID === undefined || typeof userID !== "string") {
        console.log(userID)
        console.log(typeof(userID))
        res.status(400).send("missing 'userID' parameter");
        console.log("missing userID parameter")
        return 
    }
    const id = parseInt(userID);
    const trips = await db.getAllArchivedTrips(id);
    res.json(trips);
}
export async function getMemberStatus(req: Request, res: Response) {
    const tripID = req.query.trip_id;
    const userID = req.query.user_id;
    if (userID === undefined || typeof userID !== "string") {
        console.log(userID)
        console.log(typeof(userID))
        res.status(400).send("missing 'userID' parameter");
        console.log("missing userID parameter")
        return 
    }
    const id = parseInt(userID);
    if (tripID === undefined || typeof tripID !== "string") {
        console.log(userID)
        console.log(typeof(userID))
        res.status(400).send("missing 'userID' parameter");
        console.log("missing userID parameter")
        return 
    }
    const id2 = parseInt(tripID);
    const status = await db.getMemberStatus(id2, id)
    res.json(status);

}
export async function getAllInvitedTrips(req: Request, res: Response ) {
    const userID = req.query.user_id;
    if (userID === undefined || typeof userID !== "string") {
        console.log(userID)
        console.log(typeof(userID))
        res.status(400).send("missing 'userID' parameter");
        console.log("missing userID parameter")
        return 
    }
    const id = parseInt(userID);
    const trips = await db.getAllInvitedTrips(id);
    res.json(trips);
}
export async function getAllMembers(req: Request, res: Response)
{
    const trip_id = req.query.trip_id;
    if (trip_id === undefined || typeof trip_id !== "string") {
        res.status(400).send("missing 'userID' parameter");
        console.log("missing userID parameter")
        return 
    }
    const id = parseInt(trip_id);
    const members = await db.getAllMembers(id);
    res.json(members);
}
export async function getAllExpense(req: Request, res: Response)
{
    const trip_id = req.query.trip_id;
    if (trip_id===undefined||typeof trip_id !== "string")
    {
        res.status(400).send("missing 'tripID' parameter");
        console.log("missing userID parameter")
        return 
    }
    const id = parseInt(trip_id);
    const costs = await db.getAllExpense(id);
    res.json(costs);
}
export async function getAllGroupItems(req: Request, res: Response)
{
    const trip_id = req.query.trip_id;
    if (trip_id===undefined||typeof trip_id !== "string")
    {
        res.status(400).send("missing 'tripID' parameter");
        console.log("missing userID parameter")
        return 
    }
    const id = parseInt(trip_id);
    const costs = await db.getAllGroupItems(id);
    res.json(costs);
}
export async function getAllVolunteers(req: Request, res: Response)
{
    const trip_id = req.query.trip_id;
    if (trip_id===undefined||typeof trip_id !== "string")
    {
        res.status(400).send("missing 'itemID' parameter");
        console.log("missing itemID parameter")
        return 
    }
    const id = parseInt(trip_id);
    const costs = await db.getAllVolunteers(id);
    res.json(costs);
}

export async function getDetails(req: Request, res: Response) {
    const tripID = req.query.trip_id;
    if (tripID === undefined || typeof tripID !== "string") {
        res.status(400).send("missing 'tripID' parameter");
        console.log("missing tripID parameter")
        return
    }
    const id = parseInt(tripID)
    const trip = await db.getDetails(id);
    res.json(trip);
}

export async function createUser (req: Request, res: Response) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    console.log(name);
    console.log(email);

    const names = await db.createUser(name, email, password);
    res.json(names);
}

export async function createTrip (req: Request, res: Response) {
    const name = req.body.name;

    console.log(name);
    const names = await db.createTrip(name, 0);
    //const names = await db.getAllDataTrips();
    res.json(names);
}


export async function updateAdditionalDetails(req: Request, res: Response) {
    const trip_id: number = req.body.trip_id;
    const additionalDetails = req.body.additionalDetails;

    await db.setAdditionalDetails(trip_id, additionalDetails);
    const names = await db.getAllDataTrips();
    res.json(names);
}

export async function updateDate(req: Request, res: Response) {
    const trip_id: number = req.body.trip_id;
    const date = req.body.date;

    await db.setDate(trip_id, date);
    const names = await db.getAllDataTrips();
    res.json(names);

}
export async function updateDestination(req: Request, res: Response) {
    const trip_id: number = req.body.trip_id;
    const destination = req.body.destination;
    await db.setDestination(trip_id, destination);
    const names = await db.getAllDataTrips();
    res.json(names);

}
export async function updateAllDetails (req: Request, res: Response) {
    const trip_id: number = req.body.trip_id;
    const destination = req.body.destination;
    const date = req.body.date;
    const additionalDetails = req.body.additionalDetails;

    console.log(req.body);

    const trip = await db.setAllDetails(trip_id, destination, date, additionalDetails);
    res.json(trip);
}

export async function updateGroupPack(req: Request, res: Response) {
    const trip_id: number = req.body.trip_id;
    const groupPack = req.body.groupPack;
    await db.setGroupPack(trip_id, groupPack);

    const names = await db.getAllDataTrips();
    res.json(names);

}

export async function addGroupItem (req: Request, res: Response) {
    const item: string = req.body.item;
    const trip_id = req.body.trip_id;
    const amountNeeded = req.body.amountNeeded;
    const names = await db.addGroupItem(item, trip_id, amountNeeded);
    res.json(names);
}
export async function addVolunteer (req: Request, res: Response) {
    const item_id = req.body.item_id;
    const trip_id = req.body.trip_id;
    const user_id = req.body.user_id;
    const amount = req.body.amount;
    await db.addVolunteer(item_id, trip_id, user_id, amount);
    const names = await db.getAllDataVolunteers();
    res.json(names);
}

export async function addNewCost(req: Request, res: Response) {
    const trip_ID: number = req.body.trip_id;
    const expense = req.body.expense;
    const whoToPay = req.body.whoToPay;
    const totalCost: number = req.body.totalCost;
    await db.addCost(trip_ID, expense, whoToPay, totalCost);


    const names = await db.getAllDataCosts();
    res.json(names);
}

export async function removeCost(req: Request, res: Response) {
    const cost_ID: number = req.body.cost_id;
    await db.removeCost(cost_ID);

    const names = await db.getAllDataCosts();
    res.json(names);
}
export async function removeItem(req: Request, res: Response) {
    const cost_ID: number = req.body.item_id;
    await db.removeItem(cost_ID);

    const names = await db.getAllDataCosts();
    res.json(names);
}

export async function removeVolunteer(req: Request, res: Response) {
    const item_id: number = req.body.item_id;
    const user_id: number = req.body.user_id;
    await db.removeVolunteer(item_id, user_id);

    const names = await db.getAllDataVolunteers();
    res.json(names);
}

export async function joinTrip(req: Request, res: Response) {
    const userid: number = req.body.user_id;
    const tripid: number = req.body.trip_id;
    const names = await db.joinTrip(userid, tripid);

    res.json(names);
}


export async function addMember(req: Request, res: Response) {
    const user_ID: number = req.body.user_id;
    const trip_id: number = req.body.trip_id;
    const status = req.body.status;

    const id = await db.addMember(user_ID, trip_id, status);
    res.json(id);
}

export async function archive(req: Request, res: Response) {
    const member_id: number = req.body.member_id;
    console.log("member id: " + req.body.member_id)
    const x = await db.archiveTrip(member_id);
    res.json(x);
}

export async function unarchive(req: Request, res: Response) {
    const trip_id: number = req.body.member_id;
    const x = await db.unarchiveTrip(trip_id);
    res.json(x);
}

export async function removeMember(req: Request, res: Response) {
    

    const user_ID: number = req.body.user_id;
    const trip_id: number = req.body.trip_id;

    if (user_ID === undefined || typeof user_ID !== "number") {
        res.status(400).send("missing 'user_id' parameter");
        console.log("missing user_id parameter")
        return
    }
    if (trip_id === undefined || typeof trip_id !== "number") {
        res.status(400).send("missing 'trip_id' parameter");
        console.log("missing trip_id parameter")
        return
    }

    await db.removeMember(trip_id, user_ID);

    const names = await db.getAllDataMembers();
    res.json(names);
}


