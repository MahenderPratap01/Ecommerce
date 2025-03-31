const express = require("express");
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
const port = 3000;

const User = require("./Models/User");
const Product = require("./Models/Product");

app.post("/api/users/signup", async (req, res) => {
    try {
        const { name, fatherName, dob, branch, rollNo, section, address, mobileNo, password } = req.body;

        const userExists = await User.findOne({ rollNo });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const user = new User({ name, fatherName, dob, branch, rollNo, section, address, mobileNo, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/users/signin", async (req, res) => {
    try {
        const { rollNo, password } = req.body;
        const user = await User.findOne({ rollNo });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log("Server started on port 3000");
  });

mongoose
  .connect(
    "mongodb+srv://mahenderpratap:0LXwcJRcABe6ajkK@mycluster.pksxytt.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDB Successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

