const amqp = require('amqplib');

let channel = null;
const queueName = 'order_events';
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://bakery-rabbitmq';
const RETRY_INTERVAL = 5000;

async function connectRabbitMQ() {
    console.log("Connecting to RabbitMQ at:", RABBITMQ_URL);

    while (true) {
        try {
            const connection = await amqp.connect(RABBITMQ_URL);
            channel = await connection.createChannel();
            await channel.assertQueue(queueName);
            console.log('Connected to RabbitMQ');
            break;
        } catch (error) {
            console.error('Failed to connect to RabbitMQ. Retrying in 5 seconds...', error.message);
            await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
        }
    }
}

function publishOrderEvent(order) {
    if (channel) {
        const messageBuffer = Buffer.from(JSON.stringify(order));
        channel.sendToQueue(queueName, messageBuffer);
        console.log('Order event published:', order);
    } else {
        console.error('Cannot publish order event — RabbitMQ channel is not initialized');
    }
}

module.exports = { connectRabbitMQ, publishOrderEvent };
