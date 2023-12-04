import { check, group, expect } from "k6"
import http from "k6/http"
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
    vus: 1000,
    iterations: 3500,
  };

export default function() {
    group('Reqres Create User', ()=>{
        let url = "https://reqres.in/api/users"
        let body = JSON.stringify({
            "name": "morpheus",
            "job": "leader"
        })
        let response1 = http.post(url, body)
        check( response1, {
            'is status code 201': (r) => r.status == 201,
            'has name property': (r) => r.body.includes === "morpheus",
            'has job property': (r) => r.body.includes === "leader",
            'is less than 2 second': (r) => r < 2000,
        });          
    })

    group('Reqres Updae User', ()=> {
        let url = "https://reqres.in/api/users/2"
        let body = JSON.stringify({
            "name": "morpheus",
            "job": "zion resident"
        })
        let response2 = http.put(url, body)
        check( response2, {
            'is status code 200': (r) => r.status == 200,
            'has name property': (r) => r.body.includes === "morpheus",
            'has job property': (r) => r.body.includes === "zion resident",
            'is less than 2 second': (r) => r < 2000,
        })
    })
}

export function handleSummary(data) {
    return {
      "script-result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }