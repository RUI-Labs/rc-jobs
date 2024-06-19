const { distributor } = require("../workflow")

const record = {
    id: 5,
    tag: 'Subscribed',
    address: '0x0c7ca8f18db13a173e53476706e62f3248cd3b82',
    created_at: '2024-06-19T08:55:28.549869+00:00'
}

distributor(record)
