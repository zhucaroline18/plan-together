import path from 'path';
import sqlite3 from 'sqlite3'

const db_name = path.join(__dirname, "data", "apptest.db");

const db = new sqlite3.Database(db_name, err =>{
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful connection to the database 'apptest.db' ")
});

const sql_create = `CREATE TABLE IF NOT EXISTS Users (
    User_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password TEXT
);`;

const sql_create_trip = `CREATE TABLE IF NOT EXISTS Trips (
    Trip_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(100) NOT NULL,
    Archived INTEGER,
    Destination VARCHAR(100),
    Date VARCHAR(100),
    AdditionalDetails TEXT,
    GroupPack TEXT
);`;
const sql_create_member = `CREATE TABLE IF NOT EXISTS Members (
    Member_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    User_ID INTEGER NOT NULL,
    Trip_ID Integer NOT NULL,
    Status VARCHAR(100)
);`;

const sql_create_cost = `CREATE TABLE IF NOT EXISTS Costs (
    Cost_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Trip_ID INTEGER,
    Expense VARCHAR(100) NOT NULL,
    WhoToPay VARCHAR(100) NOT NULL,
    TotalCost REAL NOT NULL
);`;


db.run(sql_create, err => {
    if (err)
    {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'Users' table");

    const sql_insert = `INSERT INTO Users (User_ID, Name, Email, Password) VALUES
    (1, 'Caroline', 'zhucaroline18@gmail.com', '170043'),
    (2, 'Cathleen', 'cathleenzhu@outlook.com', 's#170043'),
    (3, 'Mom', 'lisa.liping@gmail.com', 'Shaofeng1');`;

    db.run(sql_insert, err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Successful creation of 3 users");
    })
});


db.run(sql_create_trip, err => {
    if (err)
    {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'Trips' table");

    const sql_insert = `INSERT INTO Trips (Trip_ID, Name, Destination, Date, AdditionalDetails, GroupPack, Archived) VALUES
    (1, 'HorseShoe Cove', 'Baker Lake', '7/23/2023', 'no forget to bring mosquito repellent', 'water and grill', 0),
    (2, 'San Diego', 'Palm Springs Hotel', 'May 28', 'book tickets no later than saturday', 'tent and sleepingbags', 0);`;

    db.run(sql_insert, err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Successful creation of 2 trips");
    })
});

db.run(sql_create_member, err => {
    if (err)
    {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'Members' table");

    const sql_insert = `INSERT INTO Members (Member_ID, User_ID, Trip_ID, Status) VALUES
    (1, 1, 2, 'creator'),
    (2, 3, 2, 'joined'),
    (3, 2, 2, 'invited');`;

    db.run(sql_insert, err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Successful creation of 3 members");
    })
});

db.run(sql_create_cost, err => {
    if (err)
    {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'Costs' table");

    const sql_insert = `INSERT INTO Costs (Cost_ID, Trip_ID, Expense, WhoToPay, TotalCost) VALUES
    (1, 1, 'gas', 'caroline', 2.4),
    (2, 1, 'dinner', 'cathleen', 100);`;

    db.run(sql_insert, err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Successful creation of 2 Costs");
    })
});



export function getNames() {
    return new Promise((resolve, reject) => {
        db.all("SELECT User_ID, Name FROM Users", (err, rows) => {
            resolve(rows);
        });
    });
}

export function getEmails() {
    return new Promise((resolve, reject) => {
        db.all("SELECT User_ID, Email FROM Users", (err, rows) => {
            resolve(rows);
        });
    });
}

export function getPasswords() {
    return new Promise((resolve, reject) => {
        db.all("SELECT User_ID, Password FROM Users", (err, rows) => {
            resolve(rows);
        });
    });
}
export function getId() {
    return new Promise((resolve, reject) => {
        db.all("SELECT User_ID, User_Id FROM Users", (err, rows) => {
            resolve(rows);
        });
    });
}

export function getAllDataUsers() {
    return new Promise((resolve, reject) => {
        db.all("SELECT User_ID, Name, Email, Password FROM Users", (err, rows) => {
            resolve(rows);
        });
    });
}

export function getAllDataTrips() {
    return new Promise((resolve, reject) => {
        db.all("SELECT Trip_ID, Name, Archived, Destination, Date, AdditionalDetails, GroupPack FROM Trips", (err, rows) => {
            resolve(rows);
        });
    });
}

export function getAllDataCosts() {
    return new Promise((resolve, reject) => {
        db.all("SELECT Cost_ID, Trip_ID, Expense, WhoToPay, TotalCost FROM Costs", (err, rows) => {
            resolve(rows);
        });
    });
}

export function getAllDataMembers() {
    return new Promise((resolve, reject) => {
        db.all("SELECT Member_ID, User_ID, Trip_ID, Status FROM Members", (err, rows) => {
            resolve(rows);
        });
    });
}

export function isValid(email: string, password: string): Promise<number>{
    return new Promise((resolve, reject) => {
        //console.log("email: ${email} password: ${password}");
        db.get("SELECT Password, User_ID FROM Users WHERE Email = ?", [email], (err, row) => {
            if (row && (row as any).Password == password) {
                resolve((row as any).User_ID);
            }
            else {
                resolve(-1);
            }
        });
    });
}

type Trip = {
    tripID: number
    name: string|undefined
    archived: number|undefined
    destination: string
    date: string
    additionalDetails: string
    groupPack: string
}

type SimpleTrip = {
    tripID: number
    name:string
}

export function getAllTrips(userID: number): Promise<SimpleTrip[]>{
    return new Promise((resolve, reject) => {
        db.all("SELECT Name, Trips.Trip_ID AS Trip_ID FROM Trips INNER JOIN Members ON Members.Trip_ID = Trips.Trip_ID WHERE Members.User_ID = ?", [userID], (err, rows) => {
            const trips: SimpleTrip[] = [];

            rows.forEach(function(row) {
                const simpleTrip: SimpleTrip = {
                    tripID: (row as any).Trip_ID,
                    name: (row as any).Name
                };
                trips.push(simpleTrip);
            })
            resolve (trips);
            /*
            trips.push()
            resolve(rows.map(row=> row['Name']));*/
        });
    });
}

export function getDetails(tripId: number):Promise<Trip>{
    return new Promise((resolve, reject) => {
        db.run("SELECT * FROM Trips WHERE Trip_ID = ?", [tripId], (err, row) => {
            const trip: Trip = {
                tripID: tripId, 
                name: (row as any).Name, 
                archived: (row as any).Archived,
                destination:(row as any).Destination, 
                date:(row as any).Date,
                additionalDetails:(row as any).AdditionalDetails,
                groupPack:(row as any).GroupPack
            }
            resolve(trip);
        });
    });
}
/*
export function getDetails(tripId: number):Promise<Trip>{
    return new Promise((resolve, reject) => {
        db.run("SELECT * FROM Trips WHERE Trip_ID = ?", [tripId], function (err, row) {
            console.log(tripId)
            if (row)
            {
                console.log("row exists")
                console.log(row as any);
                const trip: Trip = {
                    tripID: tripId, 
                    name: (row as any).Name, 
                    archived: (row as any).Archived,
                    destination:(row as any).Destination, 
                    date:(row as any).Date,
                    additionalDetails:(row as any).AdditionalDetails,
                    groupPack:(row as any).GroupPack
                }
                resolve(trip);
            }
            else
            {
                console.log("row does not exist")
                console.log(err);
            }
        });
    });
}
/*
export function createUser(name: string, email: string, password: string): Promise<number>
{
    console.log(`name=${name}, email=${email}`);
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO Users (Name, Email, Password) VALUES (?, ?, ?)", [name, email, password], function(err) {
            const userId = (<any>this).lastID;
            console.log(userId);
            resolve(userId);
        });
    });
}*/


///////////////////////////////////////////////



export function createUser(name: string, email: string, password: string): Promise<number>
{
    console.log(`name=${name}, email=${email}`);
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO Users (Name, Email, Password) VALUES (?, ?, ?)", [name, email, password], function(err) {
            const userId = (<any>this).lastID;
            console.log(userId);
            resolve(userId);
        });
    });
}

export function createTrip(name: string, archived: number): Promise<number>
{
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO Trips ( Name, Archived) VALUES (?, ?)", [name, archived], function(err) {
            //console.log((<any>this).lastID);
            console.log(err);
            resolve((<any>this).lastID);
        });
    });
}

export function setAllDetails(tripId: number, destination: string, date: string, additionalDetails: string)
{
    return new Promise((resolve, reject) => {
        db.run("UPDATE Trips SET Destination = ?, Date = ?, AdditionalDetails = ?  WHERE Trip_ID = ?", [destination, date, additionalDetails, tripId], (err, rows) => {
            resolve(null);
        });
    });
}

export function archiveTrip(tripId: number)
{
    return new Promise((resolve, reject) => {
        
        db.run("UPDATE Trips SET Archived = ? WHERE Trip_ID = ?", [1, tripId], (err, rows) => {
            resolve(null);
        });
    });
}
export function unarchiveTrip(tripId: number)
{
    return new Promise((resolve, reject) => {
        
        db.run("UPDATE Trips SET Archived = ? WHERE Trip_ID = ?", [0, tripId], (err, rows) => {
            resolve(null);
        });
    });
}

export function setAdditionalDetails(tripId: number, details: string)
{
    return new Promise((resolve, reject) => {
        db.all("UPDATE Trips SET AdditionalDetails = ? WHERE Trip_ID = ?", [details, tripId], (err, rows) => {
            resolve(null);
        });
    });
}

export function setDate(trip_ID: number, date: string)
{
    return new Promise((resolve, reject) => {
        db.all("UPDATE Trips SET Date = ? WHERE Trip_ID = ?", [date, trip_ID], (err, rows) => {
            resolve(null);
        });
    });
}
export function setDestination(trip_ID: number, destination: string)
{
    return new Promise((resolve, reject) => {
        db.all("UPDATE Trips SET Destination = ? WHERE Trip_ID = ?", [destination, trip_ID], (err, rows) => {
            resolve(null);
        });
    });
}

export function setGroupPack(trip_ID: number, groupPack: string)
{
    return new Promise((resolve, reject) => {
        db.all("UPDATE Trips SET GroupPack = ? WHERE Trip_ID = ?", [groupPack, trip_ID], (err, rows) => {
            resolve(null);
        });
    });
}
/////////////////////

export function addCost(trip_ID: number, expense: string, whoToPay: string, totalCost: number)
{
    return new Promise((resolve, reject) => {
        db.all("INSERT INTO Costs (Trip_ID, Expense, WhoToPay, TotalCost) VALUES (?, ?, ?, ?)", [trip_ID, expense, whoToPay, totalCost], (err, rows) => {
            resolve(rows);
        });
    });
}

export function removeCost(cost_ID: number )
{
    return new Promise((resolve, reject) => {
        db.all("DELETE FROM Costs WHERE Cost_ID = ?", [cost_ID], (err, rows) => {
            resolve(rows);
        });
    });
}

export function addMember( user_ID: number, trip_id: number, status: string ): Promise<number>
{
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO Members (User_ID, Trip_ID, Status) VALUES (?, ?, ?) ", [user_ID, trip_id, status], function(err, rows) {
            resolve((<any>this).lastID);
        });
    });
}

export function removeMember( trip_ID: number, user_ID: number )
{
    return new Promise((resolve, reject)=> {
        db.all("DELETE FROM Members WHERE (Trip_ID= ? AND User_ID = ?)", [trip_ID, user_ID], (err, rows) => {
            resolve(rows);
        });
    });
}