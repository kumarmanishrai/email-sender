const express = require("express")
const path = require('path')
const crd = require('./cred')
const nodemailer = require('nodemailer')
const router = express.Router();
const port = process.env.port || 8000;

const app = express()

app.use('/', router)

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/template/index.html'))
    
})

router.post('/send', (req, res) => {
    let smail = req.query.smail;
    let rmail = req.query.rmail;
    let subject = req.query.subject;
    let message= req.query.message;

    let mail = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: crd.user,
            pass: crd.pass,
        }
    })
    mail.sendMail({
        from: 'timeforchange9211@gmail.com',
        to: [rmail],
        subject: subject,
        text: message
    }, (err)=>{
    if(err) throw err;
    res.send(`mail has been sent`)
})
})


app.listen(port , () => {
    console.log(`listening on port ${port}`);
    
})