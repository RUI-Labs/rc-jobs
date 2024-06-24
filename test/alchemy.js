const { handleProjectWebhook } = require("../handler")

const insert = {
  action: 'SUPABASE_WEBHOOK',
  body: {
    type: 'INSERT',
    table: 'projects',
    record: {
      id: 2,
      name: null,
      created_at: '2024-06-24T06:17:41.791852+00:00',
      token_address: '0x38d513Ec43ddA20f323f26c7bef74c5cF80b6477'
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
      token_address: '0x38d513Ec43ddA20f323f26c7bef74c5cF80b6477',
      created_at: '2024-06-19T13:10:44.927094+00:00'
    }
  }
}


handleProjectWebhook(deleteBody.body)
