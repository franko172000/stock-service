"use strict";
// import * as sinon from 'sinon';
// import StockService from "../../app/services/StockService";
// import axios from "axios";
// import csvToJson from "csvtojson";
// import * as fs from "fs";
//
// describe('Stock Service Test', ()=>{
//     const stockService = new StockService();
//     it('Should return requested stock', async ()=>{
//         const csvDataStream = fs.createReadStream(`${process.cwd()}/test/mocks/stock.csv`);
//         sinon.stub(axios, 'get')
//             .resolves(Promise.resolve({
//                 data: csvDataStream
//             }))
//         // sinon.stub(csvToJson, 'fromStream')({
//         //
//         // })
//         // sinon.createStubInstance(csvToJson).returns(
//         //     {
//         //         fromStream: sinon.stub().returns({})
//         //     }
//         // )
//
//         sinon.createStubInstance(csvToJson)
//             .fromStream(csvDataStream)
//             .resolves({
//                 Name: 'Apple',
//                 Symbol: 'AAPL.US',
//                 Open: 112,
//                 High: 114,
//                 Low: 116,
//                 Close: 112,
//                 Time: '12:30',
//                 Date: '2023-06-16',
//                 Volume: 11223344
//             })
//         const response = await stockService.getStock('appl.us');
//         console.log(response)
//     })
// })
