const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')



//console.log(path.join(__dirname,'../public'))

const app=express()
//define path for express config
console.log(path.join(__dirname,'../public'))
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')


//setup handlebars
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
//setup static directories
app.use(express.static(path.join(__dirname,'../public')))



app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Amit'


    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Amit'


    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is help text',
        title:'Help',
        name:'Amit Bhatt'


    })
})


app.get('/weather',(req,res)=>{
if(!req.query.address){
return res.send({
    error:'You must provide an address'
})
}
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
if(error){
    return res.send({error})
}
forecast(latitude,longitude,(error,forecastData)=>{
if(error){
    return res.send({error})

}
res.send({
    forecast:forecastData,
    location,
    address:req.query.address

})

})

})
    // res.send({
    //     forecast:'It is cold',
    //     location:'Mumbai',
    //     address:req.query.address
    // })
})
app.get('/products',(req,res)=>{

    if(!req.query.search){
         return --res.send({
             error:'You must provide a search term'
         })
    }

res.send({
    products:[]
})

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Amit Bhatt',
        errorMessage:'Help article not found!'
    })
})


app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'Amit Bhatt',
    errorMessage:'Page not found'
})


})

app.listen(3000,()=>{
    console.log('server on port 3000')
})