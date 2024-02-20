console.log('Client side javascript loaded!')
//const cors = require('cors')
//app.use(cors())
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     // mode: 'no-cors',
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=kolkata').then((response)=>{
//     // mode: 'no-cors',
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(error)
//         }else{
//             console.log(data.Forecast)
//             console.log(data.latlong)
//         }
//         //console.log(data)
//     })
// })

const weatherform = document.querySelector('form')
const search =document.querySelector('input')
const mess1=document.querySelector('#mess1')
const mess2=document.querySelector('#mess2')



weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc = search.value
    console.log(loc)
    fetch('http://localhost:3000/weather?address='+loc).then((response)=>{
    // mode: 'no-cors',
    response.json().then((data)=>{
        if(data.error){
            mess1.textContent ='Error: '+ data.error
            mess2.textContent = 'Give a proper location'
            console.log(data.error)
        }else{
            mess1.textContent ='Forecast of the day: '+ data.Forecast
            mess2.textContent ='Location provided: '+ data.latlong
            console.log(data.Forecast)
            console.log(data.latlong)
        }
        //console.log(data)
    })
})
})