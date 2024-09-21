import express from "express";
import cors from "cors";
import user from "../models/user.js";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user_email = await user.findOne({ email: email });
    const user_name = await user.findOne({ username: username });

    if (user_email) {
        console.log("Email already exists");
        return res.status(400).json({ message: "Email already exists" });
    }
    if (user_name) {
        console.log("Username already exists");
        return res.status(400).json({ message: "Username already exists" });
    }

    const userData = new user({
        username: username,
        email: email,
        password: hashedPassword,
    });

    try {
        await userData.save();
        return res.status(201).json({ status: true, message: "User Created Successfully" });
    } catch (error) {
        console.error("Error saving user:", error);
        return res.status(500).json({ message: "Error creating user" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user_email = await user.findOne({ email: email });

    if (!user_email) {
        return res.status(400).json({ message: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user_email.password);
    if (validPassword) {
        return res.json({ status: true, message: "Login successfully" });
    } else {
        return res.status(400).json({ message: "Invalid password" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
