const path = require('path')
const  express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode')
const forecast =require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
// paths for Express config
const path1= path.join(__dirname,'../public')
const views = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handelbars engine and views loacaton
app.set('views',views)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)
// setup static directory to serve
app.use(express.static(path1))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'avirup'
    })
})
// app.get('',(req, res)=>{
//     res.send('<h1>Hello Express</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.sendFile(__dirname,'../public/help')
//     // res.send([{
//     //     name: 'avirup',
//     // },{
//     //     age:27
//     // }])
// })
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help',
        name: 'avirup'
    })
})
// app.get('/about',(req,res)=>{
//     res.send('<h1>About Express</h1>')
// })

app.get('/about',(req,res)=>{
        res.render('about',{
            title: 'about me',
            name: 'avirup'
        })
    })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide the address term'
        })
    }
    geocode(req.query.address,(error,{lat,long,loc}={})=>{
        if(error){
            return res.send({
                error: 'Provide a correct address'
            })
        }
        
        //console.log('data',data)
        forecast(lat,long, (error, data1) => {
            if(error){
                return res.send({
                    error: 'Provide a correct loaction'
                })
            }
            res.send({
                location: req.query.address,
                Forecast: data1,
                latlong:loc
            })
            console.log(loc)        
            console.log( data1)
          })
    })
    // res.send({
    //     location: req.query.address,
    //     Forecast: 'Haze'
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide the search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404error',{
        title: 'Help article not found',
        name: 'avirup'
    })
})
app.get('*',(req,res)=>{
    res.render('404error',{
        title: 'Page not found',
        name: 'avirup'
    })
})
app.listen(port, ()=>{
    console.log('server is up on port 3000')
})