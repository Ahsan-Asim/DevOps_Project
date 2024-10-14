const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../model/User"); // Adjust the path based on your project structure
const router = express.Router();

// User signup route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        
        // Generate verification code
        const verificationCode = generateVerificationCode();
        
        // Send verification email
        await sendVerificationEmail(newUser.email, verificationCode);
        
        global.verificationCode = verificationCode; // Store verification code
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                res.status(201).json("Login successfully");
            } else {
                res.status(401).json("Password doesn't match");
            }
        } else {
            res.status(404).json("No Records found");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verification code generation and email sending functions
function generateVerificationCode() {
    return Math.floor(10000000 + Math.random() * 90000000);
}

async function sendVerificationEmail(email, verificationCode) {
    try {
        let info = await transporter.sendMail({
            from: '"Your App" <f219202@cfd.nu.edu.pk>',
            to: email,
            subject: "Email Verification",
            text: `Your verification code is: ${verificationCode}`,
        });
        console.log("Verification email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
}

module.exports = router;
