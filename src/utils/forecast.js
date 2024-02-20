const request = require('postman-request')
const forecast = (lat,long,callback)=>{
    const url = 'https://api.weatherstack.com/current?access_key=b1e53edd4f2289380d749b53d8d17ef1&query='+lat+','+long
    
    request({url,json: true},(error, {body}={})=>{
                                if(error){
                        callback('Cannot connect to weather api',undefined)
                    }else if(body.length ===0) {
                        callback('Unable to find location',undefined)
                    }
                    else{
                        //console.log(url)
                        callback(undefined,
                        body.current.weather_descriptions[0]  +'  It is currently '+body.current.temperature +' degree out. There is a '+body.current.precip+'% chance of rain.'
                        )
                             //const weather_descriptions = response.body.current.weather_descriptions
                            //console.log(weather_descriptions)
                            //callback(weather_descriptions[0]  +'  It is currently '+response.body.current.temperature +' degree out. There is a '+response.body.current.precip+'% chance of rain.')
                    }
        })
}
module.exports = forecast