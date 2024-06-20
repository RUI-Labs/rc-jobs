




// {
//     id: 5,
//     tag: 'abc',
//     address: 'a',
//     created_at: '2024-06-19T08:55:28.549869+00:00'
// }
const ethers = require('ethers');
const { supabase } = require('./supabase');

// Create a single supabase client for interacting with your database

const SEND_MESSAGE_LAMBDA_URL = "https://jb6oitlkw1.execute-api.ap-southeast-1.amazonaws.com/"

const distributor = async (input) => {

    console.log("distributor", input);

    const subscribed = await checkSubscription(input.address.toLowerCase())
    if(!subscribed) return;

    if(input.tag == "Subscribed") {
        await welcomeMessage(input.address);

    } else if(input.tag == "") {

    } else if(input.tag == "") {
        
    }

}

const checkSubscription = async (_address) => {

    console.log("checkSubscription", _address);

    try {

        const wallet = await supabase.from("wallets").select().eq("address", _address).maybeSingle();
        console.log('wallet', wallet);
        return wallet?.subscribed;
        
    } catch(error) {
        console.log(error);
        return false;
    }

}


const welcomeMessage = async (_address) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const message = `Hi! 👋
Thanks for subscribing to our newsletter! We're excited to have you with us. 🎉

Get ready for the latest updates, exclusive content, and special offers straight to your inbox. If you have any questions or suggestions, feel free to reach out anytime. We're here for you!

Welcome aboard! 🚀

Best,
RUI Labs
`

    const raw = JSON.stringify({
        "address": ethers.getAddress(_address),
        "message": message
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    fetch("https://jb6oitlkw1.execute-api.ap-southeast-1.amazonaws.com/", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));



}

const newAccount = async () => {



}

const newWallet = async () => {



}


const oldWallet = async () => {



    

}























module.exports = {
    distributor
};
  
