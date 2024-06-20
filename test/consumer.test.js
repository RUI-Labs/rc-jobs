const { consumer } = require("..");

consumer({
  Records: [
    {
      body: JSON.stringify({
        action: 'SUPABASE_WEBHOOK',
        body: {
          type: 'UPDATE',
          table: 'wallet_metrics',
          record: {
            id: 3,
            key: 'subscribe',
            value: 2,
            address: '0xcb35ed9b8a830fa472931cc63a62793910c59270',
            created_at: '2024-06-19T09:46:00.02931+00:00'
          },
          schema: 'public',
          old_record: {
            id: 3,
            key: 'subscribe',
            value: 1,
            address: '0xcb35ed9b8a830fa472931cc63a62793910c59270',
            created_at: '2024-06-19T09:46:00.02931+00:00'
          }
        }
      })
    }

  ]
})
