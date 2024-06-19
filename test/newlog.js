const { handleNewLogs } = require("../handler")

const record = {
  id: 8,
  name: 'visit',
  project: 'racecarproject',
  user_data: {
    address: '0x19951284394050C4C836534999150cF19E924eFC'
  },
  created_at: '2024-06-19T06:26:50.59761+00:00'
}


handleNewLogs(record)
