const express = require("express");
const cors = require("cors")
const app = express();
const mongoose = require('mongoose');
const UserList = require("./models/userSchema")
const bcrypt = require('bcrypt');
const emailVerification = require("./helpers/emailVerification");
const testMiddleware = require("./middleware/testMiddleware");
const jwt = require('jsonwebtoken');

const port = 3000;

app.use(cors());
app.use(express.json())

app.listen(port, (req, res) =>{
    console.log(`Example app is running on ${port}`)
})

mongoose.connect('mongodb+srv://sagor:20qp2cl2@cluster0.3x8ift0.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'));

// const users = [
//     {firstname: "sagor", lastname: "khan" , email: "sagor@gmail.com", password:"1234"}
// ]

app.get("/users",testMiddleware, async (req, res)=>{
    // res.send(users)
    const user = await UserList.find({})
    res.send(user)
})

app.get('/', (req,res)=>{
    res.send('Hello World!')
})

app.post("/users", (req, res)=>{
    console.log(req.body)
    // const newUser = req.body
    // users.push(newUser)
    const{firstname, lastname, email, password}= req.body;

    var token = jwt.sign({ id: email }, 'sk');
    console.log(token)

    if(!firstname){
        res.send("please give your firstname")
    }
    if(!lastname){
        res.send("please give your lastname")
    }
    if(!email){
        res.send("please give your email")
    }
    if(!password){
        res.send("please give your password")
    }

    bcrypt.hash(password, 10, function(err, hash) {
        // console.log(password, '-->', hash)
        const users = new UserList({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash,
            token: token,
        })
        users.save()
        emailVerification(email)
    });
    
    res.send(req.body)  //to show in postman
})