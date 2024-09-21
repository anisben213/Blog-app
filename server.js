const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.URI;
const blogRoutes = require('./routes/blogsroutes');
const { postBlog, getBlogs } = require("./controllers/blog");

// Middlewares
app.use(express.json()); 
app.use('/blogs',blogRoutes)


// MongoDB Connection
mongoose.connect(URI)
.then(() => {
  console.log("Database connected successfully");

  // Start the server only after the database is connected
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("Error connecting to the database", err);
  process.exit(1); // Exit the process if the database connection fails
});
