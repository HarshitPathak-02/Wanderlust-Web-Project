const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:"652e8a6c0a6e510a2e6a0cc7"}));
    await Listing.insertMany(initData.data);
    console.log("done");
}

initDb();

