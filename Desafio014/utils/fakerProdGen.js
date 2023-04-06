const { faker } = require('@faker-js/faker');
const logger = require('../utils/loggerWinston');
faker.locale = 'en';
logger.log('info', 'entre a faker');
const { commerce, image } = faker;
const genFakeProd = (n) => {
    let fakeProds = [];
    for (let index = 0; index < n; index++) {
        const fakeProd = {
            title: commerce.productName(),
            price: commerce.price(80, 1000),
            thumbnail: image.sports(200, 200),
        };
        fakeProds.push(fakeProd);
    }
    logger.log('info', 'Se generaron los productos con Fakerjs');
    return fakeProds;
};

module.exports = genFakeProd;
