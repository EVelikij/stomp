const stompit = require('stompit');

class StompClient {
    #options= {};
    #destination = '/queue/test';
    #client;
    
    constructor(options) {
        this.#options = options;
    }
    
    async initializeConnection() {
        return new Promise((resolve, reject) => {
            stompit.connect(this.#options, (error, client) => {
                if (error) {
                    reject(`connect error ${error.message}`);
                    return;
                }
               
               this.#client = client;
               resolve();
            });
        });
    }
    
    send(message) {
        const sendHeaders = {
            'destination': this.#destination,
            'content-type': 'text/plain'
        };

        const frame = this.#client.send(sendHeaders);
        frame.write(message);
        frame.end();
    }
    
    receive(handler) {
        const subscribeHeaders = {
            'destination': this.#destination,
            'ack': 'client-individual'
        };
        
        this.#client.subscribe(subscribeHeaders, (err, message) => {
            if (err) {
                handler(err.message);
                return;
            }

            message.readString('utf-8', (err, body) => {
                if (err) {
                    handler(err.message);
                    return;
                }
                
                handler(undefined, body);
                this.#client.ack(message);
            });
        });
    }
}

module.exports = StompClient;