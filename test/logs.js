const { consumer } = require("..");

consumer({
  Records: [
    {
      body: JSON.stringify({
        action: 'SUPABASE_WEBHOOK',
        body: {
          type: 'INSERT',
          table: 'logs',
          record: {
            id: 755,
            name: 'reply',
            payload: {
              message: 'campaign:13',
              campaign_id: '13',
              token_address: '0x38d513ec43dda20f323f26c7bef74c5cf80b6477'
            },
            project: 'Carlo',
            user_data: { address: '0x261914d11434becc57de7bbe8c82551b648e510f' },
            created_at: '2024-06-29T15:07:50.470003+00:00'
          },
          schema: 'public',
          old_record: null
        }
      })

    }
  ]

})


