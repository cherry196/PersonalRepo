const nodemailer = require('nodemailer');
var sendMail = function(reqBody,callback){
    var msgSent = false;
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
        secure: true,
            auth: {
                user: 'krishnagiri.saicharan1995@gmail.com', // generated ethereal user
                pass: 'Amma@143' // generated ethereal password
            }
        });

    let mailOptions = {
        from: 'krishnagiri.saicharan1995@gmail.com', // sender address
        to: 'krishnagiri.saicharan1995@gmail.com', // list of receivers
        subject: 'New Mail from Node Deploy', // Subject line
        text: reqBody.email+':'+reqBody.name+':'+reqBody.phone+':'+reqBody.message
        
    };
 
    

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
             console.log(error);
             callback(false);
        }
        else{
            console.log('Message sent');
            callback( true);
        }

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
}

module.exports.sendMail = sendMail;