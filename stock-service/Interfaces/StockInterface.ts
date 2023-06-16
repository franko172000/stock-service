export interface IStock {
    name: string,
    symbol: string,
    open: number,
    high: number,
    low: number,
    close: number,
    time: string,
    date: string,
    volume: number
}

export interface IStockResponse extends Omit<IStock, 'volume' | 'date' | 'time'>{}