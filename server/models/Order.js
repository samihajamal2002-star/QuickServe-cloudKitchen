const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    items:[
        {
            food:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Menu"
            },

            quantity:{
                type:Number,
                default:1
            }
        }
    ],

    totalPrice:{
        type:Number,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    paymentMethod:{
        type:String,
        enum:["Cash","Bkash","Nagad","Card"],
        default:"Cash"
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Accepted",
            "Cooking",
            "Ready",
            "Out For Delivery",
            "Delivered",
            "Cancelled"
        ],
        default:"Pending"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Order",orderSchema);