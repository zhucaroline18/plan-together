import {Request, Response} from "express";
import * as db from './database';


export async function createUser (req: Request, res: Response) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    console.log(name);
    console.log(email);

    await db.createUser(name, email, password);
    const names = await db.getAllDataUsers();
    res.json(names);
}

export async function createTrip (req: Request, res: Response) {
    const name = req.body.name;

    console.log(name);
    await db.createTrip(name);
    const names = await db.getAllDataTrips();
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

    await db.addMember(user_ID, trip_id, status);

    const names = await db.getAllDataMembers();
    res.json(names);
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
