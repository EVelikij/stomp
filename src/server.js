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
        
        setInterval(() => {
            const msg = `Hello world! (${Date.now()})`;
            console.log(`Sending: ${msg}`);
            
            client.send(msg);    
        }, 3000);
    }
    catch (e) {
        console.error(e);
    }
}

main();

