var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore')

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "/***** replace with your databaseURL ************/"
});

var db = getFirestore() ;

var menus = [{
    "name" : "Americano",
    "category": "coffee",
    "price" : 30
},{
    "name" : "Black Coffee",
    "category": "coffee",
    "price" : 30
},{
    "name" : "Cappuccino",
    "category": "coffee",
    "price" : 45
},{
    "name" : "Cocoa",
    "category": "cocoa",
    "price" : 35
},{
    "name" : "Espresso",
    "category": "coffee",
    "price" : 35
},{
    "name" : "Fresh Milk",
    "category": "milk",
    "price" : 25
},{
    "name" : "Fruit Tea",
    "category": "tea",
    "price" : 35
},{
    "name" : "Iced Tea",
    "category": "tea",
    "price" : 40
},{
    "name" : "Latte",
    "category": "coffee",
    "price" : 25
},{
    "name" : "Matcha Green Tea",
    "category": "tea",
    "price" : 30
},{
    "name" : "Milkshake",
    "category": "milk",
    "price" : 45
},{
    "name" : "Mocha",
    "category": "coffee",
    "price" : 40
}]

reviews = [{
    "name" : "Americano",
    "comment":"It's OK",
    "rev_date" : new Date(2022,11,11,12,14,36),
    "reviewer" : "Unknown",
    "stars" : 4
},{
    "name" : "Americano",
    "comment":"Nice little cafe with quality coffee",
    "rev_date" : new Date(2022,11,12,16,00,00),
    "reviewer" : "m006",
    "stars" : 4
},{
    "name" : "Black Coffee",
    "comment":"Nice coffee",
    "rev_date" : new Date(2022,11,13,12,04,12),
    "reviewer" : "m008",
    "stars" : 5
},{
    "name" : "Black Coffee",
    "comment":"I love this coffee",
    "rev_date" : new Date(2022,11,13,09,55,20),
    "reviewer" : "Unknoen",
    "stars" : 4
},{
    "name" : "Cappuccino",
    "comment":"Nice coffee",
    "rev_date" : new Date(2022,11,13,09,30,45),
    "reviewer" : "m010",
    "stars" : 4
},{
    "name" : "Cappuccino",
    "comment":"This coffee is delicious but a bit pricey",
    "rev_date" : new Date(2022,11,13,10,20,53),
    "reviewer" : "Unknown",
    "stars" : 3
},{
    "name" : "Cocoa",
    "comment":"Wow, delicious cocoa",
    "rev_date" : new Date(2022,11,13,10,20,53),
    "reviewer" : "Cartoon",
    "stars" : 4
},{
    "name" : "Cocoa",
    "comment":"I don't like cocoa, this is too sweet.",
    "rev_date" : new Date(2022,11,13,11,28,35),
    "reviewer" : "Mark",
    "stars" : 1
},{
    "name" : "Espresso",
    "comment":"I don't like this coffee",
    "rev_date" : new Date(2022,11,13,12,06,57),
    "reviewer" : "Unknown",
    "stars" : 2
},{
    "name" : "Espresso",
    "comment":"I think the coffee smells good",
    "rev_date" : new Date(2022,11,12,12,09,40),
    "reviewer" : "Sara",
    "stars" : 4
},{
    "name" : "Fresh Milk",
    "comment":"I like this!, it so sweet",
    "rev_date" : new Date(2022,11,11,12,12,14),
    "reviewer" : "Nice",
    "stars" : 5
},{
    "name" : "Iced Tea",
    "comment":"OK",
    "rev_date" : new Date(2022,11,13,12,30,16),
    "reviewer" : "Nice",
    "stars" : 3
},{
    "name" : "Iced Tea",
    "comment":"I think not bad",
    "rev_date" : new Date(2022,11,13,12,30,15),
    "reviewer" : "Mark",
    "stars" : 4
},{
    "name" : "Latte",
    "comment":"coffee + milk is not bad",
    "rev_date" : new Date(2022,11,11,12,04,12),
    "reviewer" : "Ferby",
    "stars" : 4
},,{
    "name" : "Matcha Green Tea",
    "comment":"This Green tea is so bad",
    "rev_date" : new Date(2022,11,11,12,04,12),
    "reviewer" : "Unknown",
    "stars" : 0
},{
    "name" : "Matcha Green Tea",
    "comment":"It's not green tea",
    "rev_date" : new Date(2022,11,11,12,04,12),
    "reviewer" : "m004",
    "stars" : 1
},{
    "name" : "Milkshake",
    "comment":"I love it!",
    "rev_date" : new Date(2022,11,11,12,04,12),
    "reviewer" : "m001",
    "stars" : 5
}]

menus.forEach((obj)=>{
    reviews.forEach((rev)=>{
        db.collection("menus").doc(obj.name).set({
            category: obj.category,
            price: obj.price,
        })
        if(obj.name == rev.name){
            db.collection("menus").doc(obj.name).collection("reviews").add({
                comment : rev.comment,
                rev_date : rev.rev_date,
                reviewer : rev.reviewer,
                stars : rev.stars
            }).then( docRef => { console.log("Document written with ID : "+docRef.id)})
        }
        
    })
    
})