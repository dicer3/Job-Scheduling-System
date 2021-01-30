const express = require('express')

const app = express();

//Init Middleware
app.use(express.json({ extended: false }));


//Define Routes
app.use("/api/", require("./routes/jobs"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`server started on port ${PORT}`));