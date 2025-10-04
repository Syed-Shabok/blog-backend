const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/blogs", blogRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;







// app.get("/", (req, res) => {
//   res.send("Working.");
// });