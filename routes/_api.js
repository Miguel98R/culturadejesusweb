const express = require('express')
const router = express.Router()


router.use("/auth/", require("./auth.routes"))
router.use("/sales/", require("./sales.routes"))
router.use("/users/", require("./users.router"))
router.use("/conf/", require("./configurations.routes"))

module.exports = router