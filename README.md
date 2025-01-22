" Railway_Management_System" 
Techstack
`Node.Js`, `Express.js`,` Sequelize`,`Postgres`,`SQL`,`bcryptjs`,`JWT`.

This is a Railway Management System, where there are two different roles, This Project is .
1) Admin Role
2) User Role

### Features:
1. **Admin Role**:
   - Schedule trains and set passenger capacity.
   - Add new trains based on demand.

2. **User Role**:
   - View seat availability for specific train routes.
   - Book train seats.
   - Retrieve booking details using a reference ID.

How to start the project.
1) run `npm install`
2) make sure that the sequelize dialect is set to postgres and the ports are correct.
3) Manually Create a Database, ` RailwayManagement `in pgadmin4.
Once all the steps are completed, start the server with `node index.js`


Create an admin via,
`http://localhost:3000/admin/register`
The Payload will be
```json
{
    "name":"xyz",
    "phoneNumber":"123456789",
    "email":"xyz@gmail.com",
    "password":"xyz",
    "role":"admin"
}
```

Login as an admin via,
`http://localhost:3000/admin/login`
The Payload is,
```json
{
  "phoneNumber":"123456789",
  "password":"xyz"
}

```
To schedule a train,
`http://localhost:3000/admin/scheduleTrain`,
The Example Payload is,
```json

{
    "TrainName": "Mahanagri",
    "Origin": "Mumbai",
    "Destination": "lucknow",
    "DepartureTime": "08:00 AM",
    "ArrivalTime": "02:00 PM",
    "SeatAvailable": 100,
    "SeatBooked": 0
}

```

###  Now, the User's Functionallity

 Register the user via,
`http://localhost:3000/user/register`
Example Payload:
```json
{
            "Name": "xyz",
            "phoneNumber": "123546789",
            "email": "xyz@email.com",
            "password": "****"
}

```

User login,
`http://localhost:3000/user/login`
Example Payload:
```json
{
    "name":"xyz",
    "phoneNumber":"123456789",
    "password":"****"
}
```
Now, a JWT token will be returned, using this JWT token the server can identify the user who's requesting.

The user can check if there's any seat available between two places using,
`http://localhost:3000/user/trainseat`,
payload: 
```json
{
  "origin":"Mumbai",
  "destination":"lucknow",
  "phoneNumber":"123546"
}
```
### * Make sure to add JWT token in Authorization header


The User can book a seat in the train via,
`http://localhost:3000/user/bookseat`
payload is,
```json
{
  "origin": "Mumbai",
  "userName":"xyz",
  "destination": "lucknow",
  "seatToBeBooked": 7,
  "trainName": "Mahanagri"
}
```    
This will return a booking reference id, through which one can easily check their booking.
Url to check booked status,

`http://localhost:3000/getbookingDetails?id?Username`
The uri consits of two query parameters, id indicates the booking id and Username is the Username which booked the seat.


Contact, shivamn2003@gmail.com if you have any doubts with the working.
Thanks!






