const express = require("express");
const app = express();
const cors = require("cors");

// Settings
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(require("./routes/index"));

app.listen(port, () => console.log(`Server on port ${port}`));
