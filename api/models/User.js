const mongoose = require("mongoose");
const bcrpyt =require("bcryptjs");
//const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true},
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})


//validate password match or not
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrpyt.compare(enteredPassword, this.password)
}

// resgister password hash and save
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrpyt.genSalt(10);
    this.password = await bcrpyt.hash(this.password, salt)
})
module.exports = mongoose.model("User",userSchema)