import express from "express";

const app = express();

app.get("/", (req,res)=>{
    res.send("Application is running!")
})

const listeningPort = process.env.PORT || 3050;
app.listen(listeningPort, () => {
  console.log(`Application is running on port ${listeningPort}!`);
});