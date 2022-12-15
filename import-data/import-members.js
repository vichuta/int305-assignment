var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore')

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "/***** replace with your databaseURL ************/"
});

var db = getFirestore() ;

var members = [{
    "id" : "m001",
    "firstname": "Vichuta",
    "lastname": "Pipoppinyo",
    "tel": "098-106-1111"
},{
    "id" : "m002",
    "firstname": "Panalee",
    "lastname": "Palasri",
    "tel": "092-075-2222"
},{
    "id" : "m003",
    "firstname": "Piraya",
    "lastname": "Sutthiparinyanon",
    "tel": "061-087-3333"
},{
    "id" : "m004",
    "firstname": "Aritach",
    "lastname": "Krudminburee",
    "tel": "096-133-4444"
},{
    "id" : "m005",
    "firstname": "Sanit",
    "lastname": "Sirisawatvatana",
    "tel": "095-305-5555"
},{
    "id" : "m006",
    "firstname": "Sutee",
    "lastname": "Vapeetam",
    "tel": "096-159-6666"
},{
    "id" : "m007",
    "firstname": "Benyapa",
    "lastname": "Setthawiboon",
    "tel": "097-777-777"
},{
    "id" : "m008",
    "firstname": "Pichaya",
    "lastname": "Pairin",
    "tel": "098-888-1818"
},{
    "id" : "m009",
    "firstname": "Run",
    "lastname": "Lertjitthamrong",
    "tel": "069-619-9999"
},{
    "id" : "m010",
    "firstname": "Pornticha",
    "lastname": "Sangmanee",
    "tel": "099-084-1010"
}]

members.forEach((obj)=>{
    //import data แบบตั้ง id เอง
    db.collection("members").doc(obj.id).set({
        firstname: obj.firstname,
        lastname: obj.lastname,
        tel: obj.tel
    })
})