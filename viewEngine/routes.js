const express = require('express')
const router = express.Router()

let url_js_files = "/public/js"
let url_js_files_panel = "/public/js/jsPanel"


let menu = [
    {
        title: 'Inicio',
        elements: [
            {
                icon: 'fas fa-columns',
                title: 'Evento',
                ref: '/evento',
            },
            {
                icon: 'fas fa-tools',
                title: 'Configuración',
                ref: '/configuracion',
            },


        ]
    },

]

//--------------------------------------- RUTAS WEB


router.get("/", async (req, res) => {

    res.render('index', {
            title: 'Cultura de Jesus Oficial | Home',
            url_js_files,


        }
    )
})

router.get("/ddlv", async (req, res) => {

    res.render('ddvl', {
            title: 'Cultura de Jesus Oficial | DDVL 2023',
            url_js_files,


        }
    )
})



//---------------------------------------- RUTAS PANEL

router.get("/cpanelCultura", async (req, res) => {

    res.render('panelControl/login', {
            title: 'Cultura de jesus | login',
            url_js_files,

            url_js_files_panel

        }
    )
})

router.get("/panel", async (req, res) => {

    res.render('panelControl/panel', {
            title: 'Cultura de jesus | Panel',
            menu,
            url_js_files,
            url_js_files_panel


        }
    )
})

router.get("/evento", async (req, res) => {

    res.render('panelControl/evento', {
            title: 'Cultura de jesus | Panel',
            menu,
            url_js_files,
            url_js_files_panel


        }
    )
})

//---------------------------------------- RUTAS EVENTO

router.get("/event", async (req, res) => {

    res.render('event/index', {
            title: 'Cultura de jesus | Congreso Evangelistico',
            url_js_files

        }
    )
})


router.get("/:page", async (req, res) => {
    res.render("404", {
        title: 'Cultura de Jesus Oficial | Home',
        url_js_files
    })
});


module.exports = router
