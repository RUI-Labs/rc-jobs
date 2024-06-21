
// {
//     id: 5,
//     tag: 'abc',
//     address: 'a',
//     created_at: '2024-06-19T08:55:28.549869+00:00'
// }
const ethers = require('ethers');
const { supabase } = require('./supabase');

const distributor = async (input) => {

    console.log("distributor", input);

    const subscribed = await checkSubscription(input.address.toLowerCase())
    console.log('subscribed', subscribed);
    if(!subscribed) return;

    console.log("input.tag", input.tag);
    if(input.tag == "NEW_SUBSCRIBE") {
        await welcomeMessage(input.address);
        await scheduleMessage(input.address);
    } 
    
    // else if(input.tag == "") {
    // } else if(input.tag == "") {
    // }

}

const checkSubscription = async (_address) => {

    console.log("checkSubscription", _address);

    try {

        const wallet = await supabase.from('wallets').select('*').eq("address", _address).maybeSingle().then(d => d.data);
        console.log('wallet', wallet);
        return wallet?.subscribed;

    } catch(error) {
        console.log(error);
        return false;
    }

}


const welcomeMessage = async (_address) => {

    console.log("welcomeMessage", _address)

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

    await fetch(process.env.SEND_MESSAGE_LAMBDA_URL, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));




}

const scheduleMessage = async (_address) => {

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${process.env.QSTASH_TOKEN}`);


    const sendTimestamp = Math.floor(Date.now() / 1000) + 60;

    headers.append('Content-Type', 'application/json');
    headers.append('Upstash-Not-Before', sendTimestamp);

    const raw = JSON.stringify({
        "address": _address,
        "event": "second_message"
    });

    const opts = {
        method: 'POST',
        headers: headers,
        body: raw,
    };

    console.log(process.env.QSTASH_URL, opts)

    await fetch(
        process.env.QSTASH_URL + process.env.SCHEDULE_LAMBDA_URL,
        opts,
    )
        .then((response) => response.json())
        .then((result) => console.log(JSON.stringify(result)))
        .catch((error) => console.error(error));



}



const secondMessage = async (_input) => {

    console.log("secondMessage", _input.address)

    const tags = await supabase.from('tags').select('*').eq("address", _input.address).then(d => d.data);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const uniqueTags = [...new Set(tags.map(x => x.tag))]

    let tagStrings = ""
    for(let _t of uniqueTags) {
        tagStrings += `${_t} `
    }

    const message = `
    Hi! 👋

Tags: ${tagStrings}

Best,
RUI Labs
`

    const raw = JSON.stringify({
        "address": ethers.getAddress(_input.address),
        "message": message
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    await fetch(process.env.SEND_MESSAGE_LAMBDA_URL, requestOptions)
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
    distributor,
    secondMessage
};
  
