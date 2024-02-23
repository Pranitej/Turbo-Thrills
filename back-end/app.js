const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const URL = "mongodb+srv://vangalapranitej:fJYsCZydAiwrcerk@turbo-thrills.4jvwzyk.mongodb.net/TurboThrills?retryWrites=true&w=majority&appName=Turbo-Thrills";
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("carImages"));

mongoose.connect(URL);
const con = mongoose.connection;

const customerRoutes = require("./routes/customerRoutes");
app.use("/customer", customerRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

const carRoutes = require("./routes/carRoutes");
app.use("/car", carRoutes);

const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/feedback", feedbackRoutes);

const addToCartRoutes = require("./routes/addToCartRoutes");
app.use("/cart", addToCartRoutes);

const bankRoutes = require("./routes/bankRoutes");
app.use("/bank", bankRoutes);

const carSaleRoutes = require("./routes/carSaleRoutes");
app.use("/carSale", carSaleRoutes);

const bankTransactionRoutes = require("./routes/bankTransactionRoutes");
app.use("/bankTransaction", bankTransactionRoutes);

const contactUsRoutes = require("./routes/contactUsRoutes");
app.use("/contactUs", contactUsRoutes);

con.on("open", () => {
  console.log("Connected to MongoDB...");
});

con.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.listen(PORT, () => {
  console.log(`Server listening in PORT: ${PORT}`);
});
