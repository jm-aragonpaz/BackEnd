/* import faker from 'faker'; */
const faker = require('faker');

faker.locale = 'es';
const { commerce, image } = faker;

const generateFakeProducts = (n) => {
    let fakeProducts = [];
    for (let index = 0; index < n; index++) {
        const fakeProduct = {
            title: commerce.product(),
            price: commerce.price(10, 1000),
            thumbnail: image.sports(190, 190),
        };
        fakeProducts.push(fakeProduct);
    }

    console.log('Se generaron productos con Faker.js');

    return fakeProducts;
};

module.exports = generateFakeProducts;
