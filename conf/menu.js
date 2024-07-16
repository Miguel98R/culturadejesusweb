let menu = [
    /*{href: '/conf_web', icon: 'bi-gear', label: 'Configuración Web', access: ['admin']},*/
    {href: './conf_panel', icon: 'bi-gear-fill', label: 'Configuración', access: ['admin']},
    {href: './conf_payments', icon: 'bi-credit-card', label: 'Pasarelas de pago', access: ['admin']},
    {href: './conf_users', icon: 'bi-people-fill', label: 'Usuarios', access: ['admin']},
    {href: '/conf_products', icon: 'bi-shop', label: 'Productos', access: ['admin']},
    {href: '/presales', icon: 'bi-bag', label: 'Pre ventas', access: ['admin']},
    {href: '/sales', icon: 'bi-bag-check', label: 'Ventas', access: ['admin']},
    {href: '/historic', icon: 'bi-bag-check', label: 'Historico ventas', access: ['admin']},

]

module.exports = menu