const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')
const adhan=require('adhan')
const moment=require('moment-timezone')
moment().format(); 

// middleware
app.use(cors())
app.use(express.json())

// prayer time 
const date=new Date()
var coordinates = new adhan.Coordinates(23.7808875, 90.279236);
var params = adhan.CalculationMethod.MuslimWorldLeague();
params.madhab = adhan.Madhab.Hanafi;

var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

var fajrTime = moment(prayerTimes.fajr).tz('Asia/Dhaka').format('h:mm A');
var sunriseTime = moment(prayerTimes.sunrise).tz('Asia/Dhaka').format('h:mm A');
var dhuhrTime = moment(prayerTimes.dhuhr).tz('Asia/Dhaka').format('h:mm A');
var asrTime = moment(prayerTimes.asr).tz('Asia/Dhaka').format('h:mm A');
var maghribTime = moment(prayerTimes.maghrib).tz('Asia/Dhaka').format('h:mm A');
var ishaTime = moment(prayerTimes.isha).tz('Asia/Dhaka').format('h:mm A');

const timezoneName=moment.tz.names();

app.get('/pray',(req,res)=>{
    res.send({fajrTime,sunriseTime,dhuhrTime,asrTime,maghribTime,ishaTime,date})
    // res.send(timezoneName)
})

app.get('/', (req, res) => {
    res.send('HEllo from islamic app')
})
app.listen(port, () => {
    console.log('listening at the', port)
})