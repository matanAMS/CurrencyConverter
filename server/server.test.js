import supertest from 'supertest';
import app from './server.js'
const { getExchangeRates } = require('./server.js');


describe('POST /currencyChange', () => {
    test("should respond with 200 status code"),async() => {
        const response = await request(app).post("/currencyChange").send({
            fromCurrency:"USD",
            toCurrency:"ILS"
        })
        expect(response.statusCode).toBe(200)
    }
})