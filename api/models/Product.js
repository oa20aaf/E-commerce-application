const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    name:{Type:String, required:true},
    rating: { type: Number, required: true, default:0 },
    Comment:{Type:String, required:true},
    user:{Type:mongoose.Schema.Types.ObjectId, required:true, ref: "User"},
})


const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true},
        Image: { type: String, required: true},
        description: { type: String, required: true},
        rating: { type: Number, required: true, default:0 },
        numReview: { type: Number, required: true, default:0 },
        Price: { type: Number, required: true, default:0 },
        CountInStock: { type: Number, required: true, default:0},

        reviews : [reviewSchema],
    });

    module.exports = mongoose.model("Product", productSchema)