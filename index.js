import express from 'express';
import {router} from "./src/route.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const app = express();
app.use(express.json());
app.use("/api", router);

mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(()=> console.log("Database connection established")).catch(error=> console.log(error.message));

const port = Number(process.env.PORT||3000);

app.listen(port, ()=>{
    console.log(`app listening on Port ${port}`)
})
