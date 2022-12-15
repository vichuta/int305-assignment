var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore')
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "/***** replace with your databaseURL ************/"
});
var db = getFirestore() ;

var orders = [{
    "date" : new Date(2022,11,11,12,18,27),
    "member": "m001",
    "products": [
        {"name": "Iced Tea","price": 40, "quantity": 3},
    ],
    "status": true
},{
    "date" : new Date(2022,11,11,12,20,01),
    "member": "m004",
    "products": [
        {"name": "Cocoa","price":35, "quantity": 1},
    ],
    "status": true
},{
    "date" : new Date(2022,11,11,16,50,20),
    "member": "m003",
    "products": [
        {"name": "Iced Tea","price": 40, "quantity": 1},
        {"name": "Matcha Green Tea","price": 30, "quantity": 1},
        {"name": "Milkshake","price": 45, "quantity": 1}
    ],
    "status": true
},{
    "date" : new Date(2022,11,12,09,10,15),
    "member": "",
    "products": [
        {"name": "Espresso","price": 35, "quantity": 2}
    ],
    "status": false
},{
    "date" : new Date(2022,11,12,10,30,45),
    "member": "m006",
    "products": [
        {"name": "Americano","price": 30, "quantity": 2}
    ],
    "status": true
},{
    "date" : new Date(2022,11,12,11,10,10),
    "member": "m006",
    "products": [
        {"name": "Cappuccino","price": 45, "quantity": 2},
        {"name": "Americano","price": 30, "quantity": 1}
    ],
    "status": true
},{
    "date" : new Date(2022,11,12,12,30,32),
    "member": "m001",
    "products": [
        {"name": "Fresh Milk","price": 25, "quantity": 1},
        {"name": "Milkshake","price": 45, "quantity": 1},
    ],
    "status": true
},{
    "date" : new Date(2022,11,12,12,28,22),
    "member": "m004",
    "products": [
        {"name": "Iced Tea","price": 40, "quantity": 1}
    ],
    "status": true
},{
    "date" : new Date(2022,11,12,10,02,12),
    "member": "m002",
    "products": [
        {"name": "Latte","price": 25, "quantity": 1}
    ],
    "status": true
},{
    "date" : new Date(2022,11,12,10,02,12),
    "member": "m010",
    "products": [
        {"name": "Cappuccino","price": 45, "quantity": 1}
    ],
    "status": true
},{
    "date" : new Date(2022,11,13,09,15,32),
    "member": "m009",
    "products": [
        {"name": "Americano","price": 30, "quantity": 1},
        {"name": "Black Coffee","price": 30, "quantity": 1},
        {"name": "Cappuccino","price": 45, "quantity": 1},
        {"name": "Cocoa","price": 35, "quantity": 3},
        {"name": "Iced Tea","price": 40, "quantity": 5},
        {"name": "Matcha Green Tea","price": 30, "quantity": 2},
        {"name": "Mocha","price": 40, "quantity": 1}
    ],
    "status": false
},{
    "date" : new Date(2022,11,13,10,10,13),
    "member": "m008",
    "products": [
        {"name": "Black Coffee","price": 30, "quantity": 1},
        {"name": "Matcha Green Tea","price": 30, "quantity": 1}
    ],
    "status": true
},{
    "date" : new Date(2022,11,13,11,30,45),
    "member": "m003",
    "products": [
        {"name": "Cocoa","price": 35, "quantity": 2}
    ],
    "status": true
},{
    "date" : new Date(2022,11,13,10,30,55),
    "member": "m006",
    "products": [
        {"name": "Espresso","price": 35, "quantity": 2}
    ],
    "status": false
}]
// import data แบบปกติ
orders.forEach((obj)=>{
    db.collection("orders").add({
        date: obj.date,
        member: obj.member,
        products: obj.products,
        status: obj.status
    }).then( docRef => { console.log("Document written with ID : "+docRef.id)})
})