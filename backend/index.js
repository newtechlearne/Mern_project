import express, { response } from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();
const https = require("https");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mansi123123@",
    database: "test",
});

app.get("/", (req, res) => {
    const url = "https://forkify-api.herokuapp.com/api/get?rId=47746";
    https.get(url, function(response) {
        console.log(response);
        response.on("data", function(data) {
            const recipedata = JSON.parse(data);
            console.log(recipedata);
            res.send("Here is your data: " + JSON.stringify(recipedata));
        });
    });
});


app.get("/plants", (req, res) => {
    const q = "SELECT * FROM plants";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post("/plants", (req, res) => {
    const q = "INSERT INTO plants(`title`, `description`, `ingredients`, `cover`) VALUES (?)";

    const values = [
        req.body.title,
        req.body.description,
        req.body.ingredients,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.delete("/plants/:id", (req, res) => {
    const plantId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";

    db.query(q, [plantId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.put("/plants/:id", (req, res) => {
    const plant = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, plantId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.listen(8800, () => {
    console.log("Connected to backend.");
});