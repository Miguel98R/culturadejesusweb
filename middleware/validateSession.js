
let menu = require("../conf/menu")
let validateSession = function (req, res, next) {

    if (req.session.user) {

        let dataUser = req.session.user

        const level = dataUser.usersTypes

        let meenu

        if (level == 'user') {
            res.redirect('/');

        }
        if (level == 'admin') {

            meenu = menu.filter(menuItem => menuItem.access.includes('admin'));
            req.session.menu = meenu
            next();
        }

    } else {
        res.redirect('/cjPanel');
    }
}

module.exports = validateSession