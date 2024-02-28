const express = require('express');
const app = express();
const connectToMongo = require('./db');
const cors = require('cors')
const port = 5000;


connectToMongo();

// app.get('/',(req, res)=>{
//     res.send('Hello World!')
// });


app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, ()=>{
    console.log(`Application is listening on http://localhost:${port} `)
})
