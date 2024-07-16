const express = require('express')
const router = express.Router()

const validateSession = require('./../middleware/validateSession')

let url_js_files = "/public/js/jsPanel"

///------------------------- RUTAS PARA CONTROLPANEL----------------------- ///

//LOGIN PAGE C.PANEL
router.get("/cjPanel", (req, res) => {


    let message_error = ''
    if (req?.query?.message_error) {
        message_error = req?.query?.message_error
    }


    if (req?.session?.user) {
        let menu = req?.session?.menu
        res.render("panel/conf_panel", {
            title: 'Fuego Mexicano | Control Panel',
            url_js_files,
            menu


        });
    } else {
        res.render("panel/login", {
            title: 'Fuego Mexicano | Control Panel',
            url_js_files,
            message_error

        })
    }

});

router.get("/register", (req, res) => {


    res.render("panel/register", {
        title: 'Fuego Mexicano | Control Panel',
        url_js_files,

    })


});

router.get("/panel", validateSession, (req, res) => {


    if (req?.session?.user && req?.session?.user.usersTypes == "admin" && req?.session?.user.active) {
        let menu = req?.session?.menu
        res.render("panel/conf_panel", {
            title: 'Fuego Mexicano | Control Panel',
            conf_page: "Configuración",
            url_js_files,
            menu

        });

    } else {
        res.render("panel/login", {
            title: 'Fuego Mexicano | Control Panel',
            url_js_files,

        })
    }

});

/*router.get("/conf_web", validateSession, (req, res) => {


    let menu = req?.session?.menu

    res.render("panel/conf_web", {
        title: 'Fuego Mexicano | Control Panel',
        conf_page:"Web",
        url_js_files,
        menu

    });

});*/

router.get("/conf_panel", validateSession, (req, res) => {


    let menu = req?.session?.menu

    res.render("panel/conf_panel", {
        title: 'Fuego Mexicano | Control Panel',
        conf_page: "Configuración",
        url_js_files,
        menu

    });

});

router.get("/conf_payments", validateSession, (req, res) => {


    let menu = req?.session?.menu

    res.render("panel/conf_payments", {
        title: 'Fuego Mexicano | Control Panel',
        conf_page: "Pasarelas de pago",
        url_js_files,
        menu

    });

});


router.get("/conf_blog", validateSession, (req, res) => {


    let menu = req?.session?.menu

    res.render("panel/conf_blog", {
        title: 'Fuego Mexicano | Control Panel',
        conf_page: "Blog",
        url_js_files,
        menu

    });

});

router.get("/conf_invitations", validateSession, (req, res) => {


    let menu = req?.session?.menu

    res.render("panel/conf_invitations", {
        title: 'Fuego Mexicano | Control Panel',
        conf_page: "Invitaciones",
        url_js_files,
        menu

    });

});

router.get("/conf_congresos", validateSession, (req, res) => {


    let menu = req?.session?.menu

    res.render("panel/conf_congresos", {
        title: 'Fuego Mexicano | Control Panel',
        conf_page: "Congresos",
        url_js_files,
        menu

    });

});


router.get("/conf_agenda", validateSession, (req, res) => {


    let menu = req?.session?.menu

    res.render("panel/conf_agenda", {
        title: 'Fuego Mexicano | Control Panel',
        conf_page: "Agenda",
        url_js_files,
        menu

    });

});

router.get("/conf_products", validateSession, (req, res) => {


    let menu = req?.session?.menu

    res.render("panel/conf_products", {
        title: 'Fuego Mexicano | Control Panel',
        conf_page: "Productos",
        url_js_files,
        menu

    });

});

router.get("/presales", validateSession, (req, res) => {


    let menu = req?.session?.menu

    res.render("panel/conf_presales", {
        title: 'Fuego Mexicano | Control Panel',
        conf_page: "Pre ventas",
        table: "tbl_prv",
        status_sale: 'PRV_sale',
        url_js_files,
        menu

    });

});


router.get("/sales", validateSession, (req, res) => {


    let menu = req?.session?.menu

    res.render("panel/conf_sales", {
        title: 'Fuego Mexicano | Control Panel',
        conf_page: "Ordenes",
        table: "tbl_ord",
        status_sale: 'OR_sale',
        url_js_files,
        menu

    });

});

router.get("/historic", validateSession, (req, res) => {


    let menu = req?.session?.menu

    res.render("panel/conf_sales", {
        title: 'Fuego Mexicano | Control Panel',
        conf_page: "Historico ventas",
        table: "tbl_historic",
        status_sale: 'OR_historic',
        url_js_files,
        menu

    });

});

router.get("/sendts", validateSession, (req, res) => {


    let menu = req?.session?.menu

    res.render("panel/conf_sales", {
        title: 'Fuego Mexicano | Control Panel',
        conf_page: "Órdenes en envío",
        table: "tbl_send",
        status_sale: 'OR_send',
        url_js_files,
        menu

    });

});

router.get("/conf_users", validateSession, (req, res) => {


    let menu = req?.session?.menu

    res.render("panel/users", {
        title: 'Fuego Mexicano | Control Panel',
        conf_page: "Usuarios",
        url_js_files,
        menu

    });

});


module.exports = router