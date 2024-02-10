// index.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const connection = require('./src/db/connection.js')

require('dotenv').config(
  {path:'./env'}
  );

const port = process.env.PORT;
const cors = require('cors')
const app = express();

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  Credential:true
})) 
app.use(express.json())
app.use(bodyParser.json());

connection()
.then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
.catch(()=>{
  console.log( `db connection error ${err}`);
})

// Use auth routes
app.use('/auth', authRoutes);


