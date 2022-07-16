const express = require("express")
const crd = require('./cred')
const nodemailer = require('nodemailer')
const port = process.env.port || 8000;
const app = express()
const  mail = nodemailer.createTransport({
	service:'gmail',
	auth: {
		user: crd.user,
		pass: crd.pass,
	}
})
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}))
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/template/index.html')
})
app.post('/send', (req, res) => {
	console.log(req.body)
	let rmail = req.body.rmail;
	let subject = req.body.subject;
	let message= req.body.message;
	mail.sendMail({
		from: crd.user,
		to: [rmail],
		subject: subject,
		text: message
	}, (err)=>{
		if(err) throw err;
		res.json({msg:`mail has been sent`})
	})
})
app.listen(port , () => {
	console.log(`listening on port ${port}`);

})
