// this is the main backend file that will run the server and connect to the database

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// serving different files based on the environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
