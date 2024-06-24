const ethers = require('ethers');
const { supabase } = require('./supabase');
const provider = new ethers.JsonRpcProvider(process.env.JSON_RPC_URL, null, { staticNetwork: true });

async function hasPerformedTransactions(address) {
  try {
    const transactionCount = await provider.getTransactionCount(address);
    if (transactionCount > 0) {
      console.log(`Wallet ${address} has performed ${transactionCount} transactions.`);
      return true;
    } else {
      console.log(`Wallet ${address} has not performed any transactions.`);
      return false;
    }
  } catch (error) {
    console.error('Error checking transaction count:', error);
    return false;
  }
}

module.exports.handleWalletMetrics = async function(body) {

  switch (body.record.key) {
    case "subscribe": {
      switch (body.type) {
        case "INSERT": {
          await supabase.from('tags').insert([
            {
              address: body.record.address,
              tag: 'NEW_SUBSCRIBE',
            },
          ])
            .select()
            .throwOnError()
            .then(res => {
              console.log(res.data)
            })
          break
        }
        case 'UPDATE': {
          await supabase.from('tags').insert([
            {
              address: body.record.address,
              tag: 'RESUBSCRIBE',
            },
          ])
            .select()
            .throwOnError()
            .then(res => {
              console.log(res.data)
            })
          break
        }
      }
      break
    }
    case "visit": {

      switch (body.type) {
        case "INSERT": {
          const flag = await hasPerformedTransactions(body.record.address)
          await supabase.from('tags').insert([
            {
              address: body.record.address,
              tag: 'NEW_VISITOR',
            },
            {
              address: body.record.address,
              tag: flag ? 'NEW_WALLET' : 'OLD_WALLET',
            }
          ])
            .select()
            .throwOnError()
            .then(res => {
              console.log(res.data)
            })
          break
        }
      }

      break
    }
  }
  //const flag = hasPerformedTransactions(record.user_data.address);
}


module.exports.unsubscribeFromTag = async function(record) {
  console.log('reord', record)
}

module.exports.handleProjectWebhook = async function(raw) {

  switch (raw.type) {
    case "INSERT": {
      await fetch('https://dashboard.alchemy.com/api/update-webhook-addresses', {
        method: 'PATCH',
        headers: {
          "X-Alchemy-Token": process.env.ALCHEMY_TOKEN
        },
        body: JSON.stringify({
          "addresses_to_add": [
            raw.record.token_address,
          ],
          "addresses_to_remove": [],
          "webhook_id": "wh_lx1cmp8at7fhdhvv"
        })
      })
        .then(res => res.text())
        .then(console.log)
      break
    }
    case "DELETE": {
      await fetch('https://dashboard.alchemy.com/api/update-webhook-addresses', {
        method: 'PATCH',
        headers: {
          "X-Alchemy-Token": process.env.ALCHEMY_TOKEN
        },
        body: JSON.stringify({
          "addresses_to_add": [],
          "addresses_to_remove": [raw.old_record.token_address],
          "webhook_id": "wh_lx1cmp8at7fhdhvv"
        })
      })
        .then(res => res.text())
        .then(console.log)
      break
    }
  }
}
