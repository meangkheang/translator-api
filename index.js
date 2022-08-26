var { translate } = require("google-translate-api-browser");

const express = require('express')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000

//import json file
const peoplejson =  require('./people.json')


app.use(express.json())
app.use(cors());


app.get('/',(req,res)=>{
    res.status(200).send(peoplejson)
});



//right now we support only english we will improve it later
app.post('/api/translate',(req,res)=>{
    //get userinput from request
    const {source} = req.body;


    translate(source, { to: "en" })
        .then(data => {
            res.status(200).send(
                {
                    "results":{
                        "source":{
                            "lang" : data.from.language.iso,
                            "input_text": source,
                        },
                        "target":{
                            "lang" : 'en',
                            "result_text": data.text,
                        }
                    }
                }                
            )
        })
        .catch(err => {
        console.error(err);
        });

});



app.listen(port,()=>{
    console.log(`Server start on http://localhost:${port}`)
});






