const request=require('request')
const forecast= (latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/21fceef096cc4dc953eca93fc975757a/' + latitude + ',' + longitude
request({url:url,json:true},(error,response)=>{
    if(error){
         callback('Unable to connect',undefined)
    }
    else if(response.body.error){
callback('Unable to connect',undefined)
    }
    else{
       callback(undefined,
        response.body.daily.data[0].summary+ ' It is currently '+response.body.currently.temperature +'degress out.There is a '+ response.body.currently.precipProbability+' % chances of rain'
       )
    }
})


}

module.exports=forecast