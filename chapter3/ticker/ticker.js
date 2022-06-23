import {EventEmitter} from 'events';
let count = 0;

function time(number, second, event, callback) {
    if (second >= number) {
        callback(count);
        return
    }

    setTimeout(() => {
        event.emit('tick')
        return time(number, second + 50, event, callback)
    }, 50)
}

function ticker(number, callback) {
    const eventEmitter = new EventEmitter()
    time(number, 0, eventEmitter, callback)
    return eventEmitter
}

ticker(1000, (count) => {console.log(count)})
    .on('tick', () => {
        if (Date.now() % 5 === 0) {
            throw new Error('5로 나누어 떨어짐')
        }
        count += 1
        console.log('tick')})
    .on('error', (err) => {
        console.log(err);
    })