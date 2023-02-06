const express = require('express')
const app = express()
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(cors());

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users',async (req,res)=>{
  console.log('here');
  try{
    let result = await fetch('https://jsonplaceholder.typicode.com/users').then(res=>res.json());
    res.status(200).send(result);
  }catch(e){
    res.status(500);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})