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

module.exports.handleWalletMtrics = async function(body) {
  switch (body.type) {
    case "UPDATE": {
      break
    }

    case "INSERT": {
      switch (body.record.key) {
        case "visit": {

          const flag = await hasPerformedTransactions(body.record.address)
          await supabase.from('tags').insert([
            {
              address: body.record.address,
              tag: 'NEW_VISITER',
            },
            {
              address: body.record.address,
              tag: flag ? 'NEW_WALLET' : 'OLD_WALLET',
            }
          ]).throwOnError()

          break
        }
      }
      break

    }

  }
  //const flag = hasPerformedTransactions(record.user_data.address);
}

