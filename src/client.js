const StompClient = require('./stomp-client');

const options = {
    host: 'activemq',
    port: 61613,
    connectHeaders: {
        host: '/',
        login: 'admin',
        passcode: 'secret',
        'heart-beat': '5000,5000'
    }
};

async function main() {
    const client = new StompClient(options);

    try {
        await client.initializeConnection();
        client.receive((err, message) => {
            if (err) {
                console.error('Error: err');
                return;
            }
            
            console.log(message);
        })
    }
    catch (e) {
        console.error(e);
    }
}

main();