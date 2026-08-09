const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// Register
// =========================
exports.register = async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        // Customer role fixed
        const role = "customer";

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: "Email already exists"

            });

        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({

            name,

            email,

            phone,

            password: hashedPassword,

            role

        });

        // Generate Token
        const token = jwt.sign(

            {

                id: user._id,

                role: user.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        res.status(201).json({

            success: true,

            message: "Registration Successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                phone: user.phone,

                role: user.role

            }

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// =========================
// Login
// =========================
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // =====================
        // Fixed Admin Login
        // =====================

        if (

            email === "admin@quickserve.com" &&

            password === "admin123"

        ) {

            const token = jwt.sign(

                {

                    id: "admin",

                    role: "admin"

                },

                process.env.JWT_SECRET,

                {

                    expiresIn: "7d"

                }

            );

            return res.json({

                success: true,

                token,

                user: {

                    id: "admin",

                    name: "Administrator",

                    email,

                    role: "admin"

                }

            });

        }

        // =====================
        // Fixed Chef Login
        // =====================

        if (

            email === "chef@quickserve.com" &&

            password === "chef123"

        ) {

            const token = jwt.sign(

                {

                    id: "chef",

                    role: "chef"

                },

                process.env.JWT_SECRET,

                {

                    expiresIn: "7d"

                }

            );

            return res.json({

                success: true,

                token,

                user: {

                    id: "chef",

                    name: "Chef",

                    email,

                    role: "chef"

                }

            });

        }

        // =====================
        // Fixed Rider Login
        // =====================

        if (

            email === "rider@quickserve.com" &&

            password === "rider123"

        ) {

            const token = jwt.sign(

                {

                    id: "rider",

                    role: "rider"

                },

                process.env.JWT_SECRET,

                {

                    expiresIn: "7d"

                }

            );

            return res.json({

                success: true,

                token,

                user: {

                    id: "rider",

                    name: "Rider",

                    email,

                    role: "rider"

                }

            });

        }

        // =====================
        // Customer Login
        // =====================

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email or Password"

            });

        }

        const isMatch = await bcrypt.compare(

            password,

            user.password

        );

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email or Password"

            });

        }

        const token = jwt.sign(

            {

                id: user._id,

                role: user.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        res.json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                phone: user.phone,

                role: user.role

            }

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};