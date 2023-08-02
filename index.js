const express = require('express')
const path = require('path')
const app = express()
const db = require('./config')
const bodyParser=require('body-parser')
const port = +process.eventNames.PORT || 3000

// STEP 2
app.use(express.urlencoded({extended:false}))
// app.use(express.static('./static')) APP.USE ALLOWS US TO REGISTER/USE OUR MEDIA QUERY

// STEP 3 ---HOME PAGE
app.get('/',(req,res)=>{
    res.status(200).sendFile(
        path.resolve(__dirname,'./static/html/index.html')
    
    )
})
app.get('/about',(req,res)=>{
    res.status(200).json(
        {
            msg:"About page"
        }
    )

})

// RETRIEVE ALL USERS
app.get('/users',(req,res)=>{
    const query =`
    SELECT UserId,firstName, lastName
    FROM Users;
    `
    db.query(query,(err,data)=>{
        if(err) throw err
            res.json(
            {
                status:res.statusCode,
                results: data
            }
            )
        })
      
    })
// register/add new user
app.post('/register', bodyParser.json(),(req,res)=>{
    const query = 
    `INSERT INTO Users
    SET ?;`
    db.query(query,[req.body],
        (err)=>{
            if(err) throw err;
            res.json({
                status:res.statusCode,
                msg:"Registration was successful"
            })
        })
})
// RETRIEVE SINGLE USER
app.get('/user/:id',(req,res)=>{
    const query =`
    SELECT UserId,firstName, lastName
    FROM Users
    WHERE UserId = ${req.params.id};
    `
    db.query(query,(err,data)=>{
        if(err) throw err
            res.json(
            {
                status:res.statusCode,
                results: data
            }
            )
        })
      
    })
// UPDATE USER
app.put('/user/:id', bodyParser.json(), (req, res) => {
    const query =
        `UPDATE Users 
        SET  ?
        WHERE UserId = ${req.params.id};
        `;

    db.query(query, [req.body], (err) => {
        if (err) throw err;
        res.json({
            status: res.statusCode,
            msg: "Update was successful"
        });
    });
});
// delete
app.delete('/user/:id', bodyParser.json(), (req, res) => {
    const query =
        `DELETE 
       FROM Users 
        WHERE UserId = ${req.params.id};
        `;

    db.query(query, [req.body], (err) => {
        if (err) throw err;
        res.json({
            status: res.statusCode,
            msg: "DELETE was successful"
        });
    });
});

// on the port the server will listen from...
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
