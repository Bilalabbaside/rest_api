const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const http = require('http');
// const socketio = require('socket.io');
const cors = require('cors');
require('dotenv/config');
app.use(bodyParser.json());
app.use(cors())
const getDistricts = require('./routes/district_route');
const postUser = require('./routes/register');
const getUser = require('./routes/login');
const getLab = require('./routes/labs_route');
const labRegister = require('./routes/lab_register');
const labLogin = require('./routes/lab_login')
const subAdmin = require('./routes/subAdmin_routes');
app.use('/register',postUser);
app.use('/login',getUser);
app.use('/districts',getDistricts);
app.use('/lab',getLab);
app.use('/registerlab',labRegister);
app.use('/loginlab', labLogin);
app.use('/subadmin',subAdmin);

app.get('/',(req,res)=>{
    res.send('home page');
});


mongoose.connect(process.env.DB_CONNECTION /*|| "mongodb://localhost/postss"*/, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
()=>{console.log('Connected!');});
app.listen(3001);
// const server = http.server(app);
// server.listen(3001);
// const io = socketio(server);
// module.exports = io;
// io.on('connection',(socket)=>{
//     socket.emit('hello',{
//         greeting: 'hello paul'
//     });
// });