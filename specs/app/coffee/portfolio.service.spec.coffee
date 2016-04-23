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
                stockInfo = 
                    symbol : "JNJ"
                    name: "Johnson \u0026 Johnson"
                    pricePaid: 10
                    quantity: 40
                done
            it " that is defined", ->
                expect(portfolioService.buy).toBeDefined()

            it " that add stocks to portfolio", ->
                expect(portfolio.stocks).toBeDefined()
                portfolioService.buy  stockInfo, portfolio
                expect(portfolio.availableCash).toEqual(1000 - (40 * 10))
                expect(portfolio.stocks).toContain(stockInfo)
            
