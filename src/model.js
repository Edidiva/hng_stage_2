import mongoose from "mongoose";
 const PersonSchema = new mongoose.Schema(
    {"name":{
        type: String,
        required: true
    },
    "id":{
        type: Number,
        required: true,
        unique: true,
    }
}
 )

 const Person = mongoose.model("Person", PersonSchema);
 export{Person};