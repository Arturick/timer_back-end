const nodemailer = require('nodemailer')
const config = require('../../data/config');
const userModel = require('../module/user')

let transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: config.emailPort,
    secure: true,
    auth: {
        user: config.emailUser,
        pass: config.emailPassword,
    },
})

const  email = {
    confirmLink: async (email) => {

        let link = await userModel.getLink(email)
            .then(a => {
                return a[0][0].link
            })
        let info = await transporter.sendMail({
            from: config.emailUser, // sender address
            to: email , // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Здравствуйте, чтобы активировать свой аккаунт перейдите по ссылке" , // plain text body
            html: `<a href='http://localhost/user/confirmEmail/${link}'>http://localhost/user/confirmEmail/${link}<a/>`, // html body
        });

    },
    sendCode : async (email, code) => {
        let info = await transporter.sendMail({
            from: config.emailUser, // sender address
            to: email , // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Ниже прежставлен код с помощью которого вы можете заного авторизироваться" , // plain text body
            html: `<h1>${code}</h1>`, // html body
        });
        console.log(info);
    }

}
module.exports = email;