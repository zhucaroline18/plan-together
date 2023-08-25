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

    await db.setAllDetails(trip_id, destination, date, additionalDetails);
}

export async function updateGroupPack(req: Request, res: Response) {
    const trip_id: number = req.body.trip_id;
    const groupPack = req.body.groupPack;
    await db.setGroupPack(trip_id, groupPack);

    const names = await db.getAllDataTrips();
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

export async function addMember(req: Request, res: Response) {
    const user_ID: number = req.body.user_id;
    const trip_id: number = req.body.trip_id;
    const status = req.body.status;

    const id = await db.addMember(user_ID, trip_id, status);
    res.json(id);
}

export async function archive(req: Request, res: Response) {
    const trip_id: number = req.body.trip_id;
    await db.archiveTrip(trip_id);
}

export async function unarchive(req: Request, res: Response) {
    const trip_id: number = req.body.trip_id;
    await db.unarchiveTrip(trip_id);
}

export async function removeMember(req: Request, res: Response) {
    

    const user_ID: number = req.body.user_id;
    const trip_id: number = req.body.trip_id;

    if (user_ID === undefined || typeof user_ID !== "number") {
        res.status(400).send("missing 'id' parameter");
        console.log("missing id parameter")
        return
    }

    await db.removeMember(trip_id, user_ID);

    const names = await db.getAllDataMembers();
    res.json(names);
}
