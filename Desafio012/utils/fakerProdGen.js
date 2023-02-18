const { faker } = require('@faker-js/faker');

faker.locale = 'en';

const { commerce, image } = faker;
const genFakeProd = (n) => {
    let fakeProds = [];
    for (let index = 0; index < n; index++) {
        const fakeProd = {
            title: commerce.product(),
            price: commerce.price(80, 1000),
            thumbnail: image.sports(200, 200),
        };
        fakeProds.push(fakeProd);
    }
    console.log('Se generaron los productos con Fakerjs');
    return fakeProds;
};

module.exports = genFakeProd;
