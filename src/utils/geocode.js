const request = require('postman-request')
const geocode = (address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address+'.json?access_token=pk.eyJ1Ijoia2lkaGF3a2V5ZSIsImEiOiJjbHNwdHVud2Mwc2UxMmpvOWtkMm04c21pIn0.0ojGSslvjO7zDvefXJs0RA&limit=1'
    //console.log(urll)
    request({url,json: true},(error,{body}={})=>{
        if(error){
            console.log(error)
            callback('Cannot connect to latlong api',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                loc: body.features[0].place_name
            })
        }
    })
}

// geocode('NewYork',(error,data)=>{
//     console.log('Error',error)
//     console.log('data',data)
// })
module.exports = geocode