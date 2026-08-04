import { useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const NAVY = "#1A2B4A";
const AMBER = "#F59E0B";
const AMBER_LIGHT = "#FFFBF0";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleLogin = async () => {

        try {

            setLoading(true);

            setError("");

            const { data } = await axios.post("/auth/login", {

                email,

                password

            });

            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify(data.user));

            localStorage.setItem("role", data.user.role);
const role = data.user.role.toLowerCase();

if (role === "admin") {

    navigate("/admin", { replace: true });

}

else if (role === "chef") {

    navigate("/chef", { replace: true });

}

else if (role === "rider") {

    navigate("/rider", { replace: true });

}

else {

    navigate("/", { replace: true });

}

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Login Failed"

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

                <h1
                    style={{
                        fontSize: 45
                    }}
                >

                    🍔 QuickServe

                </h1>

                <h2
                    style={{
                        marginTop: 60,
                        fontSize: 35
                    }}
                >

                    Welcome Back!

                </h2>

                <p
                    style={{
                        color: "#ddd",
                        lineHeight: 1.8,
                        marginTop: 20
                    }}
                >

                    Login to continue ordering delicious food,
                    manage kitchen, deliver orders or access
                    admin dashboard.

                </p>

                <div
                    style={{
                        marginTop: 80
                    }}
                >

                    <h3>✨ Features</h3>

                    <p>🍕 Fast Food Ordering</p>

                    <p>📦 Live Order Tracking</p>

                    <p>👨‍🍳 Kitchen Dashboard</p>

                    <p>🏍 Rider Delivery</p>

                    <p>📊 Admin Analytics</p>

                </div>

            </div>

            {/* RIGHT */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#fafafa"
                }}
            >

                <div
                    style={{
                        width: 420,
                        background: "white",
                        padding: 40,
                        borderRadius: 18,
                        boxShadow: "0 10px 30px rgba(0,0,0,.12)"
                    }}
                >

                    <h2
                        style={{
                            color: NAVY
                        }}
                    >

                        Sign In

                    </h2>

                    <p
                        style={{
                            color: "#666",
                            marginBottom: 25
                        }}
                    >

                        Login to your account

                    </p>

                    <input

                        placeholder="Email"

                        value={email}

                        onChange={(e)=>setEmail(e.target.value)}

                        style={input}

                    />

                    <div
                        style={{
                            position:"relative"
                        }}
                    >

                        <input

                            type={showPassword ? "text":"password"}

                            placeholder="Password"

                            value={password}

                            onChange={(e)=>setPassword(e.target.value)}

                            style={input}

                        />

                        <button

                            onClick={()=>setShowPassword(!showPassword)}

                            style={{

                                position:"absolute",

                                right:10,

                                top:15,

                                border:"none",

                                background:"transparent",

                                cursor:"pointer"

                            }}

                        >

                            {showPassword ? "🙈":"👁"}

                        </button>

                    </div>

                    {

                        error &&

                        <div

                            style={{

                                color:"red",

                                marginBottom:15

                            }}

                        >

                            {error}

                        </div>

                    }

                    <button

                        onClick={handleLogin}

                        style={{

                            width:"100%",

                            padding:14,

                            background:AMBER,

                            color:"white",

                            border:"none",

                            borderRadius:8,

                            fontWeight:"bold",

                            cursor:"pointer"

                        }}

                    >

                        {

                            loading ?

                            "Signing In..."

                            :

                            "Login"

                        }

                    </button>

                    <div

                        style={{

                            marginTop:25,

                            textAlign:"center"

                        }}

                    >

                        Don't have an account?

                        <Link

                            to="/register"

                            style={{

                                color:AMBER,

                                textDecoration:"none",

                                marginLeft:6,

                                fontWeight:"bold"

                            }}

                        >

                            Register

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

const input={

width:"100%",

padding:"13px",

marginBottom:18,

borderRadius:8,

border:"1px solid #ddd",

fontSize:15,

boxSizing:"border-box"

};