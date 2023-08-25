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
    Trip_ID INTEGER NOT NULL,
    Status VARCHAR(100)
);`;

const sql_create_GroupItem = `CREATE TABLE IF NOT EXISTS GroupItem (
    Item_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Item VARCHAR(100),
    Trip_ID INTEGER NOT NULL,
    Amount_needed Integer
);`;

const sql_create_volunteer = `CREATE TABLE IF NOT EXISTS Volunteers (
    Volunteer_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Item_ID INTEGER NOT NULL,
    Trip_ID INTEGER NOT NULL,
    User_ID INTEGER NOT NULL,
    Amount INTEGER NOT NULL
);`;

const sql_create_cost = `CREATE TABLE IF NOT EXISTS Costs (
    Cost_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Trip_ID INTEGER,
    Expense VARCHAR(100) NOT NULL,
    WhoToPay VARCHAR(100) NOT NULL,
    TotalCost REAL NOT NULL
);`;
/*
const alterTable = 'ALTER TABLE Members ADD COLUMN Archived INTEGER DEFAULT 0;'

db.run(alterTable, err => {
    if (err)
    {
        return console.error(err.message);
    }
    console.log("Successful addition members table");
})*/

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

type User = {
    userId: number
    name: string
}

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
db.run(sql_create_GroupItem, err => {
    if (err)
    {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'GroupItem' table");

    const sql_insert = `INSERT INTO GroupItem (Item_ID, Item, Trip_ID, Amount_needed) VALUES
    (1, 'Sleeping bags' ,1, 2),
    (2, 'tents', 3, 2),
    (3, 'firewood' ,2, 2);`;

    db.run(sql_insert, err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Successful creation of 3 groupItems");
    })
});

db.run(sql_create_volunteer, err => {
    if (err)
    {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'Volunteers' table");

    const sql_insert = `INSERT INTO Volunteers (Volunteer_ID, Item_ID, Trip_ID, User_ID, Amount) VALUES
    (1, 1, 2, 2, 3),
    (2, 3, 2, 3, 3),
    (3, 3, 2, 2, 3),
    (4, 5, 2, 1, 2);`;

    db.run(sql_insert, err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Successful creation of 3 Volunteers");
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
export function getAllDataVolunteers() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Volunteers", (err, rows) => {
            resolve(rows);
        });
    });
}
export function getAllDataGroupItem() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM GroupItem", (err, rows) => {
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
        db.all("SELECT * FROM Members", (err, rows) => {
            resolve(rows);
        });
    });
}

export function hasEmail(email: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
        db.get("SELECT Password FROM Users WHERE Email = ?", [email], (err, row) => {
            if (row) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    });
}

export function isValid(email: string, password: string): Promise<User>{
    return new Promise((resolve, reject) => {
        db.get("SELECT Password, User_ID, Name FROM Users WHERE Email = ?", [email], (err, row) => {
            if (row && (row as any).Password == password) {
                const user: User ={
                    userId: (row as any).User_ID,
                    name: (row as any).Name
                }
                resolve(user);
            }
            else {
                const user: User ={
                    userId: -1,
                    name:""
                }
                resolve(user);
            }
        });
    });
}
export function isValid2(email: string): Promise<number>{
    return new Promise((resolve, reject) => {
        db.get("SELECT Password, User_ID FROM Users WHERE Email = ?", [email], (err, row) => {
            if (row) {
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
    memberID: number
}
type Members = {
    name: string
    email: string
    status: string
}

export function getAllMembers(tripId: number): Promise<Members[]>{
    return new Promise((resolve, reject) => {
        db.all("SELECT Users.Name AS Name, Users.Email AS Email, Members.Status AS Status FROM Users INNER JOIN Members ON Members.User_ID = Users.User_ID WHERE Members.Trip_ID = ?", [tripId], (err, rows) => {
            const trips: Members[] = [];
            //console.log(rows);
            //console.log(rows.length)
            rows.forEach(row => {
                const member: Members = {
                    name: (row as any).Name,
                    email: (row as any).Email,
                    status: (row as any).Status
                };
                trips.push(member);
            })
            resolve (trips);
        });
    });
}
export function getMemberStatus(tripID: number, userID: number): Promise<string>{
    return new Promise((resolve, reject) => {
        db.get("SELECT Status FROM Members WHERE Trip_ID = ? AND User_ID = ?", [tripID, userID], (err, row)=> {
            const status = (row as any).Status;
            resolve(status)
        });
    });
}


export function getAllInvitedTrips(userId: number): Promise<SimpleTrip[]>{
    return new Promise((resolve, reject) => {
        db.all("SELECT Trips.Name AS Name, Members.Member_ID AS Member_ID, Trips.Trip_ID AS Trip_ID FROM Trips INNER JOIN Members ON Members.Trip_ID = Trips.Trip_ID WHERE Members.User_ID = ? AND Members.Status = 'invited'", [userId], (err, rows) => {
            const trips: SimpleTrip[] = [];
            //console.log(rows);
            if (rows)
            {
                rows.forEach(row => {
                    const member: SimpleTrip = {
                        name: (row as any).Name,
                        tripID: (row as any).Trip_ID,
                        memberID: (row as any).Member_ID
                    };
                    trips.push(member);
                })
                resolve (trips);
            }
            else 
            {
                resolve(trips);
            }
            //console.log(rows.length)
            
        });
    });
}

export function getAllTrips(userID: number): Promise<SimpleTrip[]>{
    return new Promise((resolve, reject) => {
        //db.all("SELECT Trips.Name AS Name, Trips.Trip_ID AS Trip_ID FROM Members INNER JOIN Trips ON Trips.Trip_ID = Members.Trip_ID WHERE Members.User_ID = ?", [userID], (err, rows) => {
        db.all("SELECT Trips.Name AS Name, Members.Member_ID AS Member_ID, Trips.Trip_ID AS Trip_ID FROM Trips INNER JOIN Members ON Members.Trip_ID = Trips.Trip_ID WHERE Members.User_ID = ? AND Members.status != 'invited' AND Members.Archived != 1", [userID], (err, rows) => {
            const trips: SimpleTrip[] = [];
            //console.log(rows);
            //console.log(rows.length)

            /*
            rows.forEach(function(row) {
                const simpleTrip: SimpleTrip = {
                    tripID: (row as any).Trip_ID,
                    name: (row as any).Name
                };
                trips.push(simpleTrip);
            })
            */
            rows.forEach(row => {
                const simpleTrip: SimpleTrip = {
                    tripID: (row as any).Trip_ID,
                    name: (row as any).Name,
                    memberID: (row as any).Member_ID
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
export function getAllArchivedTrips(userID: number): Promise<SimpleTrip[]>{
    return new Promise((resolve, reject) => {
        db.all("SELECT Trips.Name AS Name, Members.Member_ID AS Member_ID, Trips.Trip_ID AS Trip_ID FROM Trips INNER JOIN Members ON Members.Trip_ID = Trips.Trip_ID WHERE Members.User_ID = ? AND Members.Archived = 1", [userID], (err, rows) => {
            const trips: SimpleTrip[] = [];
            rows.forEach(row => {
                const simpleTrip: SimpleTrip = {
                    tripID: (row as any).Trip_ID,
                    name: (row as any).Name,
                    memberID: (row as any).Member_ID
                };
                trips.push(simpleTrip);
            })
            resolve (trips);
        });
    });
}


export function getDetails(tripId: number): Promise<Trip>{
    return new Promise((resolve, reject) => {
        //console.log("email: ${email} password: ${password}");
        db.get("SELECT * FROM Trips WHERE Trip_ID = ?", [tripId], (err, row) => {
            //console.log(row);
            if (row) {
                //console.log('sucessful')
                //console.log(row);
                //console.log((row as any).Archived)
                const trip: Trip = {
                    tripID: tripId, 
                    name: (row as any).Name, 
                    archived: (row as any).Archived, 
                    destination: (row as any).Destination, 
                    date: (row as any).Date, 
                    additionalDetails: (row as any).AdditionalDetails, 
                    groupPack: (row as any).GroupPack
                }
            
                resolve(trip);
            }
            else {
                //console.log('not successful')
                const trip : Trip  = {
                    tripID: tripId, 
                    name: "", 
                    archived:0, 
                    destination: "", 
                    date: "", 
                    additionalDetails: "", 
                    groupPack: ""
                }
                resolve(trip);
            }
        });
    });
}


export function createUser(name: string, email: string, password: string): Promise<number>
{
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO Users (Name, Email, Password) VALUES (?, ?, ?)", [name, email, password], function(err) {
            const userId = (<any>this).lastID;
            resolve(userId);
        });
    });
}
export function addGroupItem(item:string , trip_id:number, amountNeeded:number) {
    return new Promise((resolve, reject) => {
        db.all("INSERT INTO GroupItem (Item, Trip_ID, Amount_needed) VALUES (?, ?, ?)",[item, trip_id, amountNeeded], function(err) {

            resolve(null);
        });
    });
}
export function addVolunteer(item_ID: number, trip_id: number, userid: number, amount: number) {
    return new Promise((resolve, reject) => {

        db.get("SELECT Volunteer_ID FROM Volunteers WHERE User_ID = ? AND Item_ID = ?", [userid, item_ID], (err, row) => {
            if (row) 
            {
                console.log("updating volunteers")
                db.run("UPDATE Volunteers SET Amount = ? WHERE User_ID = ? AND Item_ID = ?", [amount, userid, item_ID], (err, rows) => {
                    resolve(null);
                });
            }
            else {
                console.log("inserting into volunteers")
                db.run("INSERT INTO Volunteers (Item_ID, Trip_ID, User_ID, Amount) VALUES (?, ?, ?, ?)",[item_ID, trip_id, userid, amount], function(err) {
                    resolve(null);
                })
            }
        });
        
    });
}
export function removeVolunteer(item_id: number, user_id:number )
{
    return new Promise((resolve, reject) => {
        db.all("DELETE FROM Volunteers WHERE Item_ID = ? AND User_ID = ?", [item_id, user_id], (err, rows) => {
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

export function createTrip(name: string, archived: number): Promise<number>
{
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO Trips ( Name, Archived) VALUES (?, ?)", [name, archived], function(err) {
            //console.log("creating trip")
            const lastid = (<any>this).lastID
            //console.log(lastid)
            //console.log(err);
            resolve(lastid);

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

export function joinTrip(userID: number, tripID: number )
{
    return new Promise((resolve, reject) => {
        db.run("UPDATE Members SET Status = 'joined' WHERE User_ID = ? AND Trip_ID = ? ", [userID, tripID], (err, rows) => {
            resolve(null);
        });
    });
}

export function archiveTrip(memberID: number)
{
    return new Promise((resolve, reject) => {
        
        db.run("UPDATE Members SET Archived = 1 WHERE Member_ID = ?", [memberID], (err, rows) => {
            resolve(null);
            console.log(rows);
            console.log(err);
        });
        
    });
}
export function unarchiveTrip(memberID: number)
{
    return new Promise((resolve, reject) => {
        db.run("UPDATE Members SET Archived = ? WHERE Member_ID = ?", [0, memberID], (err, rows) => {
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

export function getGroupMembers(trip_ID: number)
{
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
type Expense = {
    id: number
    expense:string
    toPay:string
    totalCost:number
}

export function addCost(trip_ID: number, expense: string, whoToPay: string, totalCost: number)
{
    return new Promise((resolve, reject) => {
        db.all("INSERT INTO Costs (Trip_ID, Expense, WhoToPay, TotalCost) VALUES (?, ?, ?, ?)", [trip_ID, expense, whoToPay, totalCost], (err, rows) => {
            resolve(rows);
        });
    });
}

export function getAllExpense(trip_ID: number): Promise<Expense[]> {
    return new Promise((resolve, reject) => {
        db.all("SELECT Cost_ID, Expense, WhoToPay, TotalCost FROM Costs WHERE Trip_ID = ?", [trip_ID], (err, rows) => {
            const costs: Expense[] = [];
            if (rows)
            {
                //console.log("got expenses")
                //console.log(rows);
                //console.log(rows.length)
                rows.forEach(row => {
                    const cost: Expense = {
                        id: (row as any).Cost_ID,
                        expense: (row as any).Expense,
                        toPay: (row as any).WhoToPay,
                        totalCost: (row as any).TotalCost
                    };
                    costs.push(cost);
                })
                resolve (costs);
            }
            else 
            {
                //console.log(err);
                resolve (costs);
            }
        });
    });
}
type GroupItem = {
    id: number
    item :string
    amountNeeded :string
}
type Volunteer = {
    id: number
    itemID: number
    userId: number
    tripId: number
    name: string
    amountVolunteering: number
}

export function getAllGroupItems(trip_ID: number): Promise<GroupItem[]> {
    return new Promise((resolve, reject) => {
        db.all("SELECT Item_ID, Item, Amount_needed FROM GroupItem WHERE Trip_ID = ?", [trip_ID], (err, rows) => {
            const costs: GroupItem[] = [];
            //const volunteerArr: Volunteer[] = []
            if (rows)
            {
                //console.log("got group items")
                //console.log("rows: " + rows);
                //console.log("length of rows: "+rows.length)
                rows.forEach(row => {
                    const cost: GroupItem = {
                        id: (row as any).Item_ID,
                        item: (row as any).Item,
                        amountNeeded: (row as any).Amount_needed,
                    };
                    costs.push(cost);
                })
                resolve (costs);
            }
            else 
            {
                //console.log("error: " + err);
                resolve (costs);
            }
        });
    });
}


export function getAllVolunteers(trip_ID: number): Promise<Volunteer[]> {
    return new Promise((resolve, reject) => {
        db.all("SELECT Volunteers.Volunteer_ID AS Volunteer_ID, Volunteers.Trip_ID AS Trip_ID, Volunteers.Item_ID AS Item_ID, Volunteers.User_ID AS User_ID, Volunteers.Amount AS Amount, Users.Name AS Name FROM Volunteers INNER JOIN Users ON Users.User_ID = Volunteers.User_ID WHERE Volunteers.Trip_ID = ?", [trip_ID], (err, rows) => {
            const costs: Volunteer[] = [];
            if (rows)
            {
                //console.log("got volunteers: ")
                //console.log("rows: "+ rows);
                //console.log("length of rows: "+rows.length)
                rows.forEach(row => {
                    const cost: Volunteer = {
                        id: (row as any).Volunteer_ID,
                        itemID: (row as any).Item_ID,
                        tripId: (row as any).Trip_ID,
                        userId: (row as any).User_ID,
                        name: (row as any).Name,
                        amountVolunteering: (row as any).Amount
                    };
                    costs.push(cost);
                })
                resolve (costs);
            }
            else 
            {
                console.log("didn't get volunteers");
                console.log(err);
                resolve (costs);
            }
        });
    });
}



export function removeItem(cost_ID: number )
{
    return new Promise((resolve, reject) => {
        db.all("DELETE FROM GroupItem WHERE Item_ID = ?", [cost_ID], (err, rows) => {
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
            //console.log("successful deleting of member")
        });
    });
}