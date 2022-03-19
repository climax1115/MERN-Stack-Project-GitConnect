const express = require('express'); 
const connectDB = require('./config/db')
const app = express(); 
const path = require('path'); 

//Connects to the database 
connectDB(); 

//Initialize the middlewares 
//automatically grabs the data from the req.body (client)
app.use(express.json({extended: false})); 

//Define routes for users, auth, profile, and posts
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))

//serve static assets in producion 
if(process.env.NODE_ENV === 'production') {
    //set static folder 
    app.use(express.static('client/build')); 

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));