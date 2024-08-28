import bcrypt from "bcrypt";
import express from "express";

const app = express();

//middleware
app.use(express.json());

const users = [];
app.post("/signup",async (req,res)=>{
    //get the username and password
    const {username,password}= req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
        username,
        password : hashedPassword,
    });
    res.send("User created");
});

app.post("/login",async (req,res)=>{
    const {username,password} = req.body;

    //check username
    const user = users.find((user) => user.username === username);
    if(!user){
        res.status(200).send("User not found");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        res.status(200).send("Incorrect Password");
        return
    }
    res.send(`Welcome ${username}`);

});


app.listen(3000,()=>{
    console.log(`server running on port 3000`);
    
})





// -------------------------------------------------- Basics of app authentication ---------------------------------------------
// const password = "12345";

// const salt = await bcrypt.genSalt();
// console.log(salt);

// // const hashedPassword = await bcrypt.hash(password,10);
// // console.log(hashedPassword);

// console.time("hash");
// const hashedPassword = await bcrypt.hash(password,10);
// console.log(hashedPassword);
// console.timeEnd("hash");

// //check the validity of password
// const isValid = await bcrypt.compare("12345",hashedPassword);
// console.log(isValid);

