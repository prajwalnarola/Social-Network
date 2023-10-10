const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const userRoutes = require("./routes/user.routes");
const followRoutes = require("./routes/follow.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comments.routes");
const messageRoutes = require("./routes/message.routes");
const savedPostRoutes = require("./routes/savedPosts.routes");


// app.use("/demo", (req, res)=>{
//     console.log("Recieved request");
//     res.status(200).send("As an captain of team India/Bharat Rohit sharma lifted ICC 2023 ODI worldcup trophy");
// });

app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/follow", followRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/message",messageRoutes);
app.use("/savedPost",savedPostRoutes);


app.listen(3000, () => {
  console.log("I'm ready to listen you on 3000");
});
