describe 'The Portifolio Service module... ', ->
    done = null
    JOHNSON_AND_JOHNSON = "Johnson \u0026 Johnson"
    JNJ = "JNJ"

    beforeEach -> module('ExchangeApp')

    portfolioService = undefined
    beforeEach -> inject (_PortfolioService_) -> 
        portfolioService = _PortfolioService_

    it 'should be defined ', ->
        expect(portfolioService).toBeDefined()

    describe 'handle operations such as ', ->
        portfolio = undefined
        beforeEach ->
            portfolio = 
                availableCash: 1000
                stocks: []
            done

        describe 'buy ', ->
            stockInfo = undefined
            beforeEach -> 
                portfolio.availableCash = 1000

                stockInfo = 
                    symbol : JNJ
                    name: JOHNSON_AND_JOHNSON
                    pricePaid: 10
                    quantity: 40
                portfolioService.buy  stockInfo, portfolio
                expect(portfolioService.buy).toBeDefined()

                done
            describe "that add new stocks to portfolio", ->
                it "keeping the last paid price", ->
                    expect(portfolio.availableCash).toEqual(1000 - (40 * 10))
                it "and updating the current available cash", ->
                    expect(portfolio.stocks).toContain(stockInfo)

            describe "or update existing ones", ->
                expectedStockInfo = undefined
                newStockInfo = undefined
                beforeEach -> 
                    newStockInfo = 
                        symbol : JNJ
                        name: JOHNSON_AND_JOHNSON
                        pricePaid: 12
                        quantity: 40

                    expectedStockInfo = 
                        symbol : JNJ
                        name: JOHNSON_AND_JOHNSON
                        pricePaid: 12
                        quantity: 80
                    portfolioService.buy  newStockInfo, portfolio

                it "refreshing number of stocks and storing the latest price ", ->
                    expect(portfolio.stocks).toContain(expectedStockInfo)
 
                it "and updating portfolio's available cash ", ->
                    expect(portfolio.availableCash).toEqual(600 - (40 * 12))
                it "throwing an error if there is not enough money", ->
                    theCall = () -> 
                        portfolio.availableCash = 10
                        portfolioService.buy  newStockInfo, portfolio
                    expect(theCall).toThrowError("Not enough cash");


        describe 'sell ', ->
            stockInfo = undefined
            beforeEach -> 
                stockInfo = 
                    symbol : JNJ
                    name: JOHNSON_AND_JOHNSON
                    pricePaid: 10
                    quantity: 40
                portfolio = 
                    availableCash: 1000
                    stocks: [stockInfo]

                expect(portfolioService.buy).toBeDefined()
                done

            describe "that reduce the stocks in portfolio", ->
                sellInfo = undefined
                beforeEach -> 
                    sellInfo = 
                        symbol: JNJ
                        bidPrice: 15
                        quantity: 30

                it "increasing the availableCash ", ->
                    portfolioService.sell sellInfo, portfolio
                    expect(portfolio.availableCash).toEqual(1000 + (30 * 15))
                it "reducing the stock number and preserving the last pricePaid ", ->
                    currentQuantity = _.find(portfolio.stocks, {symbol: JNJ}).quantity
                    sellInfo = 
                        symbol: JNJ
                        bidPrice: 15
                        quantity: currentQuantity
                    portfolioService.sell sellInfo, portfolio
                    expect(_.find(portfolio.stocks, {symbol: JNJ})).not.toBeDefined()

                it "removing stock from portfolio if quantity zeroes out", ->
                    portfolioService.sell sellInfo, portfolio
                    expectedStockInfo = 
                        symbol : JNJ
                        name: JOHNSON_AND_JOHNSON
                        pricePaid: 10
                        quantity: 10
                    expect(portfolio.stocks).toContain(expectedStockInfo)
                it "throwing an error if stock does not exist in portfolio", ->
                    theCall = () -> 
                        sellInfo = 
                            symbol: "NOT HERE"
                            bidPrice: 15
                            quantity: 30
                        portfolioService.sell sellInfo, portfolio
                    expect(theCall).toThrowError("NOT HERE is not in portfolio");
                it "throwing an error if stock exists but not in required quantity", ->
                    theCall = () -> 
                        sellInfo = 
                            symbol: JNJ
                            bidPrice: 15
                            quantity: 300
                        portfolioService.sell sellInfo, portfolio
                    expect(theCall).toThrowError("Portfolio does not have required quantity");



