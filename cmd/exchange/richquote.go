package main

import (
	"errors"
    "github.com/bndr/gopencils" 
)


type StockStruct struct {
    Symbol      string  //QQQ,
    Name        string //PowerShares QQQ Trust, Series 1,
    Open        float32 //107.33,
    High        float32 //107.8,
    Low         float32 //106.69,
    BidPrice    float32 //107.29,
    AskPrice    float32//107.3,
    AskSize     float32//20,
    BidSize     float32//135,
}


func RetrieveQuote(symbol string) (*StockStruct, error){
	api := gopencils.Api("http://data.benzinga.com/rest/")
    querystring := map[string]string{"symbols": symbol}
    // URL Requested: http://your-api-url.com/api/users/123/items?page=100&per_page=1000
    resp := make(map [string]StockStruct)
    _, err := api.Res("richquoteDelayed", &resp).Get(querystring)
    result, ok := resp[symbol]
    if !ok {
    	return nil, errors.New("Could not find symbol " + symbol)
    }

    return &result, err
}
