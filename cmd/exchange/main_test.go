package main

import (
    "testing"
    "encoding/json"
    "fmt"
    "github.com/bndr/gopencils" 
)
 
type respStruct struct {
    Args          map[string]string
    Headers       map[string]string
    Origin        string
    Url           string
    Authorization string
}
func dTestRestCall(t *testing.T) {

    api := gopencils.Api("https://api.github.com")
    // Users Resource
    users := api.Res("users")

    usernames := []string{"bndr", "torvalds", "coleifer"}

    for _, username := range usernames {
        // Create a new pointer to response Struct
        r := new(respStruct)
        // Get user with id i into the newly created response struct
        _, err := users.Id(username, r).Get()
        if err != nil {
            t.Errorf("Error finding users: %s", err)
            fmt.Println(err)
        } else {
            fmt.Println(r)
        }
    }
}

 

type Response2 struct {
    Page   int      `json:"page"`
    Fruits []string `json:"fruits"`
}

func TestHandleConversion1(t *testing.T){
    str := `{"page": 1, "fruits": ["apple", "peach"]}`
    res := Response2{}
    

    err := json.Unmarshal([]byte(str), &res)
    if err != nil {
        t.Errorf("Failed this: %s", err)    
    }

    fmt.Println(res)
    fmt.Println(res.Fruits[0])

}
 
 
 
