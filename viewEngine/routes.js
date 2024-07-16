const express = require('express')
const path = require("path");
const router = express.Router()

let img_link = "/public/images/cultura_img"
let img_logos = "/public/images/logos"
let img_lideres = "/public/images/Lideres"
const leaders = [
    {
        name: "Ezequiel y Viky",
        img: `${img_lideres}/Ezequiel_Viky_colaboradores_principales.jpg`,
        ministry: "Colaboradores principales",
        logo: `${img_logos}/cjn-min.png`,
    },
    {
        name: "Félix y Chuy",
        img: `${img_lideres}/Félix_Chuy_colaboradores_principales.jpg`,
        ministry: "Colaboradores principales",
        logo: `${img_logos}/cjn-min.png`,
    },
    {
        name: "Carlos y Merari",
        img: `${img_lideres}/Carlos_Merari_colaboradores_principales.jpg`,
        ministry: "Colaboradores principales",
        logo: `${img_logos}/cjn-min.png`,
    },
    {
        name: "Marco y Karina",
        img: `${img_lideres}/Marco_Karina_Colaboradores_principales.jpg`,
        ministry: "Colaboradores principales",
        logo: `${img_logos}/cjn-min.png`,
    },
    {
        name: "Aza",
        img: `${img_lideres}/Aza_oración.jpg`,
        ministry: "Oración",
        logo: `${img_logos}/cjn-min.png`,
    },
    {
        name: "Beto y Lili",
        img: `${img_lideres}/Beto_Lili_matrimonios.jpg`,
        ministry: "Matrimonios",
        logo: `${img_logos}/matrimonios2-min.png`,
    },
    {
        name: "Joel",
        img: `${img_lideres}/Joel_alabanza.jpg`,
        ministry: "Banda CJ",
        logo: `${img_logos}/banda_cj_blanco_min.png`,
    },
    {
        name: "Karlita y Dany",
        img: `${img_lideres}/Karlita_Dany_Líderes de niños.jpg`,
        ministry: "Fundadores",
        logo: `${img_logos}/kids-min.png`,
    },
    {
        name: "Uriel y Moni",
        img: `${img_lideres}/Uriel_Moni_creativos.jpg`,
        ministry: "Genesis Creativos",
        logo: `${img_logos}/genesis_1.png`,
    },
    {
        name: "Claudia",
        img: `${img_lideres}/Claudia_librería.jpg`,
        ministry: "Librería",
        logo: `${img_logos}/cjn-min.png`,
    },
    {
        name: "Felipe y Ana",
        img: `${img_lideres}/Felipe_Ana_jóvenes12herederos.jpg`,
        ministry: "Herederos (Jovenes +12)",
        logo: `${img_logos}/herederos-min.png`,
    },
    {
        name: "Domi y Rocio",
        img: `${img_lideres}/Domi_Rocio_jóvenes_16clan.jpg`,
        ministry: "Clan (Jovenes +16)",
        logo: `${img_logos}/el_clan-min.png`,
    },
    {
        name: "Cade y Evelyn",
        img: `${img_lideres}/Cade_Evelyn_jóvenes_21atalayas.jpg`,
        ministry: "Atalayas (Jovenes +21)",
        logo: `${img_logos}/atalayas-min.png`,
    },
    {
        name: "Orlando_Karis",
        img: `${img_lideres}/Orlando_Karis_jóvenes26_anclas.jpg`,
        ministry: "Anclas (Jovenes +26)",
        logo: `${img_logos}/anclas-min.png`,
    },
    {
        name: "Alejandra",
        img: `${img_lideres}/alejandra_intencional.png`,
        ministry: "Intencional",
        logo: `${img_logos}/cjn-min.png`,
    },
    {
        name: "Kevin",
        img: `${img_lideres}/Kevin_Audio.jpg`,
        ministry: "Audio",
        logo: `${img_logos}/cjn-min.png`,
    },
    {
        name: "Eber y Karen",
        img: `${img_lideres}/Eber_karen_ADN.png`,
        ministry: "ADN",
        logo: `${img_logos}/cjn-min.png`,
    },
    {
        name: "Eduardo y Ruth",
        img: `${img_lideres}/Eduardo_Ruth_desayunos.jpg`,
        ministry: "Oasis",
        logo: `${img_logos}/cjn-min.png`,
    },
    {
        name: "Magali",
        img: `${img_lideres}/Magali_dulcería.jpg`,
        ministry: "Dulcería",
        logo: `${img_logos}/cjn-min.png`,
    },
    {
        name: "Max y Ame",
        img: `${img_lideres}/Max_ame_atención_pastoral.jpg`,
        ministry: "Atención pastoral",
        logo: `${img_logos}/cjn-min.png`,
    },
    {
        name: "Víctor y Eli",
        img: `${img_lideres}/Víctor_Eli_Staff.jpg`,
        ministry: "Staff",
        logo: `${img_logos}/staff_hola-min.png`,
    },
]

router.get("/", (req, res) => {
    res.render("index",
        {
            title: "Cultura de Jesús| Home",
            img_link,
            img_logos
        });
});

router.get("/about", (req, res) => {
    res.render("about");
});
router.get("/ministries", (req, res) => {
    res.render("ministries-layout", {

            title: "Cultura de Jesús| Ministerios",
            img_link,
            img_logos,
            img_lideres,
            leaders
        }
    );
});


router.get("/events", (req, res) => {
    res.render("events-layout", {

        title: "Cultura de Jesús| Congresos",
        img_link,
        img_logos,

    });
});
router.get("/band", (req, res) => {
    res.render("band", {
        title: "Cultura de Jesús| Banda CJ",
        img_link,
        img_logos,

    });
});


router.get("/ddlv", (req, res) => {
    res.render("ddlv", {
        title: "Cultura de Jesús| DDLV 2024",
        img_link,
        img_logos,

    });
});


router.get("/predicas_ddlv", (req, res) => {
    res.render("ddlv_predicas", {
        title: "Cultura de Jesús| Predicas - DDLV 2024",
        img_link,
        img_logos,

    });
});

const viewXMLmap = async (req, res) => {
    try {
        // Ruta al archivo XML existente
        const filePath = path.join(__dirname, '../sitemap.xml');

        // Enviar el XML como respuesta
        res.set('Content-Type', 'application/xml');
        res.status(200).sendFile(filePath);
    } catch (error) {
        console.error('Error al enviar el sitemap XML:', error);
        res.status(500).json({error: 'Error al enviar el sitemap XML'});
    }
};


router.get('/sitemap.xml', viewXMLmap)

router.get("/:page", async (req, res) => {
    res.render("coming-soon",{
        title: "Cultura de Jesús| 404",
        img_link,
        img_logos,
    });
});



module.exports = router
