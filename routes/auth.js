import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        if (!(email && password && firstName && lastName)) {
            return res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedUserPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(),
            password: encryptedUserPassword,
            role: role || 'User',
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            'RANDOM',
            { expiresIn: "5h" }
        );

        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                'RANDOM',
                { expiresIn: "5h" }
            );

            user.token = token;

            return res.status(200).json(user);
        }

        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
});

export default router;
