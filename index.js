const express = require("express");
const app = express();
const IndexRoute = require('./src/Routes/IndexRoute');
require("dotenv").config();


app.use(express.json())

// routes
app.use('/api',IndexRoute)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
