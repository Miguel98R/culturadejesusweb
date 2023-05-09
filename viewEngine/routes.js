const express = require('express')
const router = express.Router()

let url_js_files = "/public/js"


let menu = [
    {
        icon: 'far fa-plus-square',
        img: './public/img/iconsMenu/ordenes.png',
        title: 'Generar orden',
        ref: '/orders',
    },
    {
        icon: 'fas fa-teeth',
        img: './public/img/iconsMenu/products.png',
        title: 'Productos',
        ref: '/products'
    }, {
        icon: 'fas fa-tooth',
        img: './public/img/iconsMenu/dentista.png',
        title: 'Dentistas',
        ref: '/dentistas'
    },


    {
        icon: 'fas fa-arrow-right',
        img: './public/img/iconsMenu/diente.png',
        title: 'Entrantes',
        ref: '/status_entrante',
    },
    {
        icon: 'fas fa-business-time',
        img: './public/img/iconsMenu/prueba.png',
        title: 'A Prueba',
        ref: '/status_prueba',
    },
    {
        icon: 'fas fa-undo-alt',
        img: './public/img/iconsMenu/regreso.png',
        title: 'Regresadas',
        ref: '/status_regresadas',
    },
    {
        icon: 'fas fa-check-circle',
        img: './public/img/iconsMenu/terminado.png',
        title: 'Terminadas',
        ref: '/status_terminadas',
    },
    {
        icon: 'fas fa-exchange-alt',
        img: './public/img/iconsMenu/cambios.png',
        title: 'Con Cambios',
        ref: '/status_cambios',
    },
    {
        icon: 'fas fa-ban',
        title: 'Canceladas con costos',
        img: './public/img/iconsMenu/cancelarConCostos.png',
        ref: '/status_CancelConCostos',
    },
    {
        icon: 'fas fa-ban',
        img: './public/img/iconsMenu/cancelado.png',
        title: 'Canceladas',
        ref: '/status_canceladas',
    },


]

// RUTAS WEB
router.get("/", async (req, res) => {

    res.render('index', {
            title: 'Cultura de Jesus Oficial | Home',
            url_js_files
        }
    )
})


// RUTAS PANEL

router.get("/panel", async (req, res) => {

    res.render('panel', {
            title: 'Cultura de jesus | Panel',
            menu,
            logo

        }
    )
})

// RUTAS EVENTO

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
