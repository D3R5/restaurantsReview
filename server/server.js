const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const db = require("./db/index")
const { query } = require('./db/index');
const morgan = require("morgan");

app.use(express.json());

//! GET ALL RESTAURANTS
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants");
        console.log(results)
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurant: results.rows,
            },
        });
    } catch(err) {
        console.log(err);
    } 
});

//! GET A RESTAURANT
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const results = await db.query("select * from restaurants where id = $1", [req.params.id]);
        //select * from restaurants where id = req.params.id
        res.status(200).json({
            status: "sucess",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch(err) {
        console.log(err)
    }
});

//! CREATE A RESTAURANT
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        console.log(results)
        res.status(201).json({
            status: "sucess",
            data: {
                restaurant: results.rows[0], 
            }
        })
    } catch(err) {
        console.log(err)
    }
})

//! UPDATE RESTAURANTS 
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "sucess",
            data: {
                restaurant: results.rows[0],
            }
        })
    } catch(err) {
        console.log(err);
    } 
    console.log(req.params.id);
});

//!DELETE A RESTAURANT
app.delete("/api/v1/restaurants/:id", (req, res) => {
    try {
        const results = db.query("DELETE FROM restaurants where id = $1", [req.params.id]);
        res.status(204).json({
            status: "sucess"
        });
    } catch(err) {
        console.log(err);
    }
});

const port = process.env.PORT || 3005; 
app.listen(port, () => {
    console.log(`Server up and listening on port ${port} ☻`);
});
