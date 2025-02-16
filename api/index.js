const express = require("express");
const app = express();
const dotenv = require("dotenv");
const products = require("./data/Products")
dotenv.config();
const PORT = process.env.PORT;

const mongoose = require("mongoose")

//connect db
mongoose.connect(process.env.MONGOOSEDB_URL).then(()=>console.log("db connected")).then((err)=>{
    err;
})

// api product test route
app.get("/api/products", (req, res) => {
    res.json("products");
});
app.get("/api/products/:id", (req, res) => {
    const product = products.find((product)=>product.id == req.params.id)
   res.json(product);
});

app.listen(PORT || 9000, () => {  
    console.log(`server listening on port ${PORT}`);
});



//olamideadeniyi02
//QvUJ2WmbEPc56FsC
//Your current IP address (82.3.6.235)
//mongodb+srv://olamideadeniyi02:QvUJ2WmbEPc56FsC@cluster0.gkfka.mongodb.net/REACT_NODE-APP

