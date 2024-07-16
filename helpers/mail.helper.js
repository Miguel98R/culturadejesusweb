const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport(require('../conf/mail.config'));

const fs = require('fs');
const path = require('path');

module.exports = {
    sendMail: async function (from = '"Fuego Mexicano" <noreply@fuegomexicano.com>', to = 'miguelxbox3303@gmail.com', subject = 'Hello ', html, text) {
        try {
            if (typeof to == 'object' && Array.isArray(to)) {
                to = to.split(', ')
            }

            let body = {
                from: from, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
            }
            if (html.trim() && html != '') {
                body.html = html
            } else {
                body.text = text
            }

            let mail_ = await transporter.sendMail(body);

            console.log("-- se mando el  email -- :D ")

            return mail_

        } catch (e) {
            console.error('Error al enviar el correo electrónico')
            console.error('e')
            throw e
        }
    },
    template: {
        generic: async function (image_banner, small_title, big_title, description, button_link, button_text) {
            if (!image_banner || image_banner.trim() == '') {
                image_banner = 'https://www.fuegomexicano.com/public/images/fuego/logo_.png'
            }

            let html = fs.readFileSync(path.join(__dirname, 'mailTemplates', 'generico.html'), {
                encoding: 'utf8',
                flag: 'r'
            });
            html = html.replaceAll('{{image_banner}}', image_banner)
            html = html.replaceAll('{{image_banner}}', image_banner)

            html = html.replaceAll('{{small_title}}', small_title)
            html = html.replaceAll('{{big_title}}', big_title)
            html = html.replaceAll('{{description}}', description)
            html = html.replaceAll('{{button_link}}', button_link)
            html = html.replaceAll('{{button_text}}', button_text)
            return html

        },
        invitation_repsonse: async function (image_banner, name_people, name_event) {
            if (!image_banner || image_banner.trim() == '') {
                image_banner = 'https://www.fuegomexicano.com/public/images/fuego/logo_.png'
            }

            let html = fs.readFileSync(path.join(__dirname, 'mailTemplates', 'response_invitations.html'), {
                encoding: 'utf8',
                flag: 'r'
            });
            html = html.replaceAll('{{image_banner}}', image_banner)
            html = html.replaceAll('{{image_banner}}', image_banner)

            html = html.replaceAll('{{name_people}}', name_people)
            html = html.replaceAll('{{name_event}}', name_event)

            return html

        },


    }
}
