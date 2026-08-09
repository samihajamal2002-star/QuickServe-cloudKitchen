import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const NAVY = "#1A2B4A";
const AMBER = "#F59E0B";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "customer"
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleRegister = async () => {

        setError("");
        setSuccess("");

        if (
            !form.name ||
            !form.email ||
            !form.phone ||
            !form.password
        ) {

            setError("Please fill all fields.");

            return;

        }

        if (form.password !== form.confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            const { data } = await axios.post("/auth/register", {

                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                role: form.role

            });

            setSuccess(data.message);

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Registration Failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                fontFamily: "Segoe UI"
            }}
        >

            {/* LEFT */}

            <div
                style={{
                    background: NAVY,
                    color: "white",
                    padding: "70px"
                }}
            >

                <h1 style={{ fontSize: 42 }}>

                    🍔 QuickServe

                </h1>

                <h2
                    style={{
                        marginTop: 60,
                        fontSize: 35
                    }}
                >

                    Create Account

                </h2>

                <p
                    style={{
                        marginTop: 20,
                        lineHeight: 1.8,
                        color: "#ddd"
                    }}
                >

                    Join QuickServe and enjoy
                    fast food ordering,
                    live order tracking,
                    chef dashboard,
                    rider delivery
                    and admin management.

                </p>

            </div>

            {/* RIGHT */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#f8f8f8"
                }}
            >

                <div
                    style={{
                        width: 450,
                        background: "white",
                        padding: 40,
                        borderRadius: 18,
                        boxShadow: "0 10px 25px rgba(0,0,0,.12)"
                    }}
                >

                    <h2
                        style={{
                            color: NAVY
                        }}
                    >

                        Register

                    </h2>

                    <br />

                    <input
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        style={input}
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        style={input}
                    />

                    <input
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                        style={input}
                    />

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        style={input}
                    >

                        <option value="customer">

                            Customer

                        </option>

                        <option value="admin">

                            Admin

                        </option>

                        <option value="chef">

                            Chef

                        </option>

                        <option value="rider">

                            Rider

                        </option>

                    </select>

                    <input

                        type={showPassword ? "text" : "password"}

                        name="password"

                        placeholder="Password"

                        value={form.password}

                        onChange={handleChange}

                        style={input}

                    />

                    <input

                        type={showPassword ? "text" : "password"}

                        name="confirmPassword"

                        placeholder="Confirm Password"

                        value={form.confirmPassword}

                        onChange={handleChange}

                        style={input}

                    />

                    <label>

                        <input

                            type="checkbox"

                            onChange={() =>

                                setShowPassword(!showPassword)

                            }

                        />

                        {" "}Show Password

                    </label>

                    <br />
                    <br />

                    {

                        error &&

                        <p
                            style={{
                                color: "red"
                            }}
                        >

                            {error}

                        </p>

                    }

                    {

                        success &&

                        <p
                            style={{
                                color: "green"
                            }}
                        >

                            {success}

                        </p>

                    }

                    <button

                        onClick={handleRegister}

                        style={button}

                    >

                        {

                            loading ?

                            "Creating Account..."

                            :

                            "Register"

                        }

                    </button>

                    <br />
                    <br />

                    <div
                        style={{
                            textAlign: "center"
                        }}
                    >

                        Already have an account?

                        <Link
                            to="/login"
                            style={{
                                color: AMBER,
                                textDecoration: "none",
                                marginLeft: 5,
                                fontWeight: "bold"
                            }}
                        >

                            Login

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

const input = {

    width: "100%",

    padding: "13px",

    marginBottom: "15px",

    border: "1px solid #ddd",

    borderRadius: "8px",

    fontSize: "15px",

    boxSizing: "border-box"

};

const button = {

    width: "100%",

    padding: "14px",

    background: "#F59E0B",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer",

    fontWeight: "bold",

    fontSize: "16px"

};