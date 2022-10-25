require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT;


const api = require('./Routes/api');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", api);

mongoose
    .connect(process.env.MONGO_URI)
        .then( () => {
            console.log('Connected to DB');

            app.listen(PORT, () => {
                console.log(`it's alive on http://localhost:${PORT}`);
            });
        }).catch( (error) =>{
            console.log(error);
        });


