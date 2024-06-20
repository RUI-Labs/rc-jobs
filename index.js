const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const sqs = new SQSClient();

const { distributor, secondMessage } = require('./workflow');
const { handleWalletMtrics } = require("./handler");


const consumer = async (event) => {
  try {
    for (const record of event.Records) {
      const raw = JSON.parse(record.body)
      console.log('raw', raw)
      switch (raw.action) {
        case "SUPABASE_WEBHOOK": {
          switch (raw.body.table) {

            case "wallet_metrics": {
              await handleWalletMtrics(raw.body.type, raw.body.record)
              break
            }

            case "tags": {
              console.log(raw.body.record)
              await distributor(raw.body.record);
              break
            }
          }
        }
      }


    }
  } catch (err) {
    console.error(err)
    //await informOffice(err)
  }
};

const producer = async (event) => {
  let statusCode = 200;
  let message;

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No body was found",
      }),
    };
  }

  try {
    await sqs.send(new SendMessageCommand({
      QueueUrl: process.env.QUEUE_URL,
      MessageBody: JSON.stringify({
        action: event.queryStringParameters.action,
        body: JSON.parse(event.body)
      }),
    }));

    message = "Message accepted!";
  } catch (error) {
    console.log(error);
    message = error;
    statusCode = 500;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
    }),
  };
};



const { Receiver } = require("@upstash/qstash");


const schedule = async (event) => {

  console.log(event);

  const r = new Receiver({
    currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
    nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
  });

  const isValid = await r.verify({
    signature: event.headers["upstash-signature"],
    body: event.body,
  }).catch((err) => {
    console.error(err);
    return false;
  });

  if (!isValid) {
    return new Response("Invalid signature", { status: 401 });
  }

  let statusCode = 200;
  // let message;

  const body = JSON.parse(event.body);
  console.log(body);

  if(body?.event === "second_message") {

    console.log("second_message, second_message");
    secondMessage(body);

  }

  return {
    statusCode,
    body: JSON.stringify({"message":"done"}),
  };

};

module.exports = {
  producer,
  consumer,
  schedule,
};
