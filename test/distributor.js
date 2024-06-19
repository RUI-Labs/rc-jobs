const { distributor } = require("../workflow")

const record = {
    id: 5,
    tag: 'Subscribed',
    address: '0xcb35ed9b8a830fa472931cc63a62793910c59270',
    created_at: '2024-06-19T08:55:28.549869+00:00'
}

distributor(record)
