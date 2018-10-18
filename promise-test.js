
var Web3PromiEvent = require('web3-core-promievent');

var myFunc = function(){
    var promiEvent = Web3PromiEvent();
    
    setTimeout(function() {
        promiEvent.eventEmitter.emit('done', 'Hello!');
        promiEvent.resolve('Hello!');
    }, 10);
    setTimeout(function() {
        promiEvent.eventEmitter.emit('next', 'Bye');
        promiEvent.resolve('Bye');
    }, 1000);
    
    return promiEvent.eventEmitter;
};
 
var newFunc = function() {
    var promiEvent = Web3PromiEvent();

    myFunc()
    .on('done', done => {
        promiEvent.eventEmitter.emit('done', done);
        promiEvent.resolve(done);
    })
    .on('next', next => {
        promiEvent.eventEmitter.emit('done', next);
        promiEvent.resolve(next);
    })

    return promiEvent.eventEmitter;
}

newFunc()
.on('done', console.log)
.on('next', console.log)