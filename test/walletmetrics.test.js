const { handleWalletMtrics } = require("../handler")

const update = {
  action: 'SUPABASE_WEBHOOK',
  body: {
    type: 'UPDATE',
    table: 'wallet_metrics',
    record: {
      id: 11,
      key: 'visit',
      value: 8,
      address: '',
      created_at: '2024-06-19T10:05:56.243698+00:00'
    },
    schema: 'public',
    old_record: {
      id: 11,
      key: 'visit',
      value: 7,
      address: '',
      created_at: '2024-06-19T10:05:56.243698+00:00'
    }
  }
}

const insert = {
  action: 'SUPABASE_WEBHOOK',
  body: {
    type: 'INSERT',
    table: 'wallet_metrics',
    record: {
      id: 12,
      key: 'visit',
      value: 1,
      address: '0x19951284394050C4C836534999150cF19E924eFC',
      created_at: '2024-06-19T13:10:44.927094+00:00'
    },
    schema: 'public',
    old_record: null
  }
}


handleWalletMtrics(insert.body)
