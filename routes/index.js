'use strict';

var express = require('express');

var bodyParser = require('body-parser');

var router = express.Router();

var nodemailer = require('nodemailer');

require('dotenv').config();

//if i implement newsletter--want to be sending updates on....
var cron = require('node-cron');

// use res.render to load up an ejs view file
// index page
router.get("/", function (req, res) {
  res.render("index");
});

//my contact form mail service
router.post('/', function (req, res) {
	var name = req.body.name;
	var subjectname = "Temitoyosi's Contact Form"
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;

	var HelperOptions =
	{
		// from: '"' + subjectname + '" <' + process.env.GMAIL_USER + '>',
    //test this when mail is working
		from: `${subjectname}<${process.env.GMAIL_USER}>`,
		to: process.env.GMAIL_USER,
		cc: process.env.ADMIN_GMAIL_USER,
		bcc: process.env.SUPER_ADMIN_GMAIL_USER,
		subject: 'New message from contact form',
		// html: `<b>Subject</b> - ` + subject + `<br><b>Message</b> - ` + message + `<br><br>This mail was sent from ` + `<b>` + email + `(` + name + `)` + `</b>`
		html: `<b>Subject</b> - ${subject} 
            <br>
            <b>Message</b> - ${message}
            <br>
            <br>
            This mail was sent from <b>${email} (${name})</b>`
	};


	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS
		}
	});

	transporter.sendMail(HelperOptions, (error, info) => {

		if (error) {
			console.log("error in transporter");
			console.log(error);
			var responseHeader = "Oops!"
			var response = "Error sending mail...Please do try again.";


			return res.send({
				responseHeader: responseHeader,
				responseText: response,
				success: "Unable to send mail successfully",
				status: 500,

			});
		}
		console.log('successful', info.messageId, info.response);
		console.log(info);
		var responseHeader = "Thank you!"
		var response = "Thank you for reaching out to us...We would get back to you shortly...";
		return res.send({

			responseHeader: responseHeader,
			responseText: response,
			success: "Updated Successfully",
			status: 200,

		});

	})
  //send acknowledment mail
  //get my google password
	process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

});


module.exports = router;