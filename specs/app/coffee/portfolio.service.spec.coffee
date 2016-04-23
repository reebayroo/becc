describe 'The Portifolio Service module... ', ->
    done = null

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
                    symbol : "JNJ"
                    name: "Johnson \u0026 Johnson"
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
                        symbol : "JNJ"
                        name: "Johnson \u0026 Johnson"
                        pricePaid: 12
                        quantity: 40

                    expectedStockInfo = 
                        symbol : "JNJ"
                        name: "Johnson \u0026 Johnson"
                        pricePaid: 12
                        quantity: 80
                    portfolioService.buy  newStockInfo, portfolio

                it "refreshing number of stocks and storing the latest price ", ->
                    expect(portfolio.stocks).toContain(expectedStockInfo)
 
                it "and updating portfolio's available cash ", ->
                    expect(portfolio.availableCash).toEqual(600 - (40 * 12))

            
