package main

import (
    "testing"
    "encoding/json"
    "fmt"
)


func TestStockStructUnmarshalling(t *testing.T){
    jsonString := `{ "QQQ": {   "symbol": "QQQ", 
                                "name": "PowerShares QQQ Trust, Series 1",
                                "open": 107.33,
                                "high": 107.8,
                                "low": 106.69,
                                "bidPrice": 107.29,
                                "askPrice": 107.3,
                                "askSize": 20,
                                "bidSize": 135
                            }
                    }`
   
    quote := make(map [string]StockStruct)
    err := json.Unmarshal([]byte(jsonString), &quote)
    if err != nil {
        t.Errorf("Failed this: %s", err)  
    }
    fmt.Println(quote)
    stock := quote["QQQ"]
    printStockStruct(&stock)

}
func printStockStruct(stock *StockStruct){
    fmt.Printf("\nSymbol :%s", stock.Symbol     )
    fmt.Printf("\nName :%s", stock.Name       )
    fmt.Printf("\nOpen :%g", stock.Open       )
    fmt.Printf("\nHigh :%g", stock.High       )
    fmt.Printf("\nLow :%g", stock.Low        )
    fmt.Printf("\nBidPrice :%g", stock.BidPrice   )
    fmt.Printf("\nAskPrice :%g", stock.AskPrice   )
    fmt.Printf("\nAskSize :%g", stock.AskSize    )
    fmt.Printf("\nBidSize :%g", stock.BidSize    )
    fmt.Println("DONE")

}
func TestRestCall_With_ABC(t *testing.T){
//  var url = "//data.benzinga.com/rest/richquoteDelayed?symbols={0}&callback=JSON_CALLBACK".format(searchParam);
    resp, err := RetrieveQuote("ABC")
    if err != nil {
        t.Errorf("Failed this: %s", err)    
    }

    printStockStruct(resp)
}

func TestRestCall_With_Invalid(t *testing.T){
//  var url = "//data.benzinga.com/rest/richquoteDelayed?symbols={0}&callback=JSON_CALLBACK".format(searchParam);
    resp, err := RetrieveQuote("THISISTHEQuote")
    if err == nil {
        t.Errorf( "Should return nil got %s and %t", resp, err == nil)    
    } 

    expected := "Could not find symbol THISISTHEQuote"
    if (err.Error() != expected){
      t.Errorf( "Compared fail expected [%s] and got [%s]", expected, err.Error())      
    }
}

