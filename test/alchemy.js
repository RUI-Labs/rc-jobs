const { handleProjectWebhook } = require("../handler")

const insert = {
  action: 'SUPABASE_WEBHOOK',
  body: {
    type: 'INSERT',
    table: 'wallet_metrics',
    record: {
      id: 12,
      key: 'subscribe',
      value: 1,
      address: '0x38d513Ec43ddA20f323f26c7bef74c5cF80b6477',
      created_at: '2024-06-19T13:10:44.927094+00:00'
    },
    schema: 'public',
    old_record: null
  }
}

const deleteBody = {
  action: 'SUPABASE_WEBHOOK',
  body: {
    type: 'DELETE',
    table: 'wallet_metrics',
    schema: 'public',
    old_record: {
      id: 12,
      key: 'subscribe',
      value: 1,
      address: '0x38d513Ec43ddA20f323f26c7bef74c5cF80b6477',
      created_at: '2024-06-19T13:10:44.927094+00:00'
    }
  }
}


handleProjectWebhook(deleteBody.body)
