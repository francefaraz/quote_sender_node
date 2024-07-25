const nodeMailer=require('nodemailer')
 // nodemailer send email taking function otp?
console.log(process.env.SMTP_PASSWORD)
//  const transpoter=nodeMailer.createTransport({
//     port: 465,
//     host: "smtp.gmail.com",
//     auth:{
//         user:"thomas.webeqt@gmail.com",
//         pass:process.env.SMTP_PASSWORD
//     },
//     secure:true
    
//  })

const transpoter=nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thomas.webeqt@gmail.com',
        pass: process.env.GMAIL_PASSWORD
    }
});


const sendOtp=async(otp,email,username)=>{
    const mailData={
        from:"noreply@farstudios.com",
        to:email,
        subject:'Your OTP',
        text:`hi ${username} your otp is ${otp}`,
        html:`Hi <b>${username}</b>,<br>
        Here is your OTP</span> to login to your Quote Sender App <b>: ${otp} </b>.<br>
        Best Regards <br> Far Studios`
    }
    console.log(transpoter,"=transpoter")
    console.log(`email data is ${mailData}`)


    return new Promise((resolve, reject) => {
        transpoter.sendMail(mailData, (err, info) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log('Message sent successfully');
            resolve(true);
          }
        });
      });



}


module.exports={sendOtp}
