import Stock from "../../database/model/Stock";
import Chance from "chance";
const ch = new Chance();
export class StockMocker {
  static make(userId: number): Stock {
    return Stock.build({
      user_id: userId,
      name: ch.name(),
      symbol: ch.string({
        length: 4
      }),
      open: ch.floating(),
      high: ch.floating(),
      low: ch.floating(),
      close: ch.floating(),
      time: ch.timestamp(),
      date: ch.date(),
      volume: ch.integer({ min: 0, max: 20000 })
    })
  }
}
