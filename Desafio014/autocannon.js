const autocannon = require('autocannon');
const perfHooks = require('perf_hooks');
const { PassThrough } = require('stream');
const { start } = require('0x');

const loadTest = async () => {
    const instance = await start();
    const url = 'http://localhost:8080/info';

    const result = await autocannon({
        url: url,
        connections: 100,
        duartion: 20,
    });
    await instance.stop();
    console.log(result);
};
loadTest();
// function run(url) {
//     const buf = [];
//     const outputStream = new PassThrough();
//     const inst = autocannon({
//         url,
//         connections: 100,
//         duration: 20,
//     });
//     autocannon.track(inst, { outputStream });
//     outputStream.on('data', (data) => buf.push(data));
//     inst.on('done', function () {
//         process.stdout.write(Buffer.concat(buf));
//     });
// }
// console.log('Running autocannon');
// run('http://localhost:8080/info');
