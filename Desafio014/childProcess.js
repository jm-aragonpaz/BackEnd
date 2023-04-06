function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

process.on('message', (msg) => {
    if (msg.start == 'start') {
        let cantNum;
        if (msg.cantNum) {
            cantNum = msg.cantNum;
        } else {
            cantNum = 100000000;
        }

        const arrRandoms = [];

        for (let i = 0; i < cantNum; i++) {
            arrRandoms.push(getRandomInt(1, 1000));
        }

        const result = {};
        arrRandoms.forEach(function (num) {
            result[num] = (result[num] || 0) + 1;
            console.log(result);
        });

        process.send({ resultado: result });
    }
});
