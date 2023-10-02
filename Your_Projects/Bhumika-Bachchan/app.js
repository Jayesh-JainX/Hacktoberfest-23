const express = require('express')
const bodyParser = require('body-parser');
const fs = require("fs");   
const path = require('path');     

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

// app.use('/random-name', (req,res)=>{
//     const {first_name} = data_f[Math.floor(Math.random()*100)]
//     return res.json({first_name})
// });

app.get('/name_f', (req, res) => {
    fs.readFile("MOCK_DATA_f.json", "utf8", (err, data) => {
      if (err) throw err;
      const names= JSON.parse(data);
      const index = Math.floor(Math.random() * 100)
      res.json(names[index]);
    });
  });

app.get('/name_m', (req, res) => {
    fs.readFile("MOCK_DATA_m.json", "utf8", (err, data) => {
      if (err) throw err;
      const names= JSON.parse(data);
      const index = Math.floor(Math.random() * 100)
      res.json(names[index]);
    });
  });

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,"index.html"));
// })

app.listen(3000,()=>{
    console.log("App listening on port 3000")
})