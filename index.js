const express = require('express')
const path = require('path')
const app = express()
const db = require('./config')
const port = ++process.eventNames.PORT || 3000
app.use(express.static('./static')) 

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
app.get('/users',(req,res)=>{
    const query =`
    SELECT UserId,firstName, lastName
    FROM Users;
    `
    db.query(query,(err,data)=>{
        if(!err){
            res.status(200).json(
            {
                results: data
            }
            )
        }
        res.status(404).json(
            {
                msg: "An error occurred"
            }
        
        )
    })


// app.all('*',(req,res)=>{
//     res.status(404).json({
//         msg:'An error occurred'
//     })
// })
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
