const { ethers } = require('ethers');
const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");

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

module.exports.handleNewLogs = function(record) {
  const flag = hasPerformedTransactions(record.user_data.address);
}

