const { consumer } = require("..");

consumer({
  Records: [
    {
      body: JSON.stringify({
        action: 'SUPABASE_WEBHOOK',
        body: {
          type: 'DELETE',
          table: 'tags',
          record: {
            id: 11,
            key: 'subscribe',
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

      })
    }

  ]
})
