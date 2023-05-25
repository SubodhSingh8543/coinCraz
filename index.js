const express = require("express");
const cors = require("cors");
const { connect } = require("./db");
const { authRoute } = require("./routes/authRoutes");
const { uniqueTimerRoute } = require("./routes/uniqueIdRoutes");
const { resultRoute } = require("./routes/resultRoutes");
const { winnerRoute } = require("./routes/findwinnerRoute");
const app = express()
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/user",authRoute);
app.use("/timeid",uniqueTimerRoute);
app.use("/result",resultRoute);
app.use("/winner",winnerRoute);

app.listen(process.env.port,async () => {
    try {
        await connect;
        console.log("connected to database");
    } catch (error) {
        console.log(error);
        console.log("Disconnected from database");
    }
})