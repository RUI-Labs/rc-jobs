//const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
//const sqs = new SQSClient();

const consumer = async (event) => {
  try {
    for (const record of event.Records) {
      const body = JSON.parse(record.body)
      switch (body.table) {
        case "logs": {
          console.log(body.record)
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
      MessageBody: event.body,
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

module.exports = {
  producer,
  consumer,
};
