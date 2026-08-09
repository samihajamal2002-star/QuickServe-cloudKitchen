const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const path=require("path");

dotenv.config();

const app = express();
const server = http.createServer(app);

// ================= Socket.IO =================
const io = new Server(server, {
  cors: {
    origin: /^http:\/\/localhost:\d+$/,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.set("io", io);

// ================= Middleware =================
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

// ================= Routes =================
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= Home Route =================
app.get("/", (req, res) => {
  res.send("🚀 QuickServe Backend Running...");
});

// ================= Socket Connection =================
io.on("connection", (socket) => {
  console.log("🟢 User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 User Disconnected:", socket.id);
  });
});

// ================= MongoDB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");

    server.listen(process.env.PORT || 5000, () => {
      console.log(
        `🚀 Server Running on Port ${process.env.PORT || 5000}`
      );
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err);
  });