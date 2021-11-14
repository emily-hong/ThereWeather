const { toXY } = require("./xyConvert")
const axios = require("axios")
const serviceKey = require("../../config/key")
const aqiUrl = require("../../config/url")

module.exports = async (req, res) => {
    console.log("map.js 서버")

    // function getCurrentDate() {
    //     //'20211102' 형식
    //     let date = new Date()
    //     let year = date.getFullYear().toString()
    //     let month = date.getMonth() + 1
    //     month = month < 10 ? "0" + month.toString() : month.toString()
    //     let day = date.getDate()
    //     day = day < 10 ? "0" + day.toString() : day.toString()
    //     return year + month + day
    // }

    function getCurrentDate() {
        //'20211102' 형식
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000
        let month = new Date().getMonth() + 1
        let curHour = new Date() + KR_TIME_DIFF
        let hourMin = Number(
            curHour.split(" ")[3] + month + curHour.split(" ")[2]
        )
        return String(hourMin)
    }

    //초단기예보시간 - 예보시간은 각 30분, api제공시간은 45분
    // function getFormatTime() {
    //     let hourDate = new Date(Date.now() - 45 * 60 * 1000)
    //     let hour = hourDate.getHours()
    //     hour = hour >= 10 ? hour : "0" + hour
    //     return hour + "" + "30"
    // }

    function getFormatTime() {
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000
        const curHour = new Date() + KR_TIME_DIFF
        let hour = curHour.split(" ")[4].slice(0, 2)
        return hour + "" + "30"
    }

    const { lat, lon } = req.body
    const toXYconvert = toXY(lat, lon)
    const url = aqiUrl.dataUrl
    const ServiceKey = decodeURIComponent(serviceKey.publicPortalkey)

    axios
        .get(url, {
            params: {
                ServiceKey: ServiceKey,
                numOfRows: "60",
                pageNo: "1",
                dataType: "JSON",
                base_date: "20211115",
                base_time: "0249",
                nx: toXYconvert.x,
                ny: toXYconvert.y,
            },
        })
        .then((res2) => {
            console.log(res2.data.response)
            //기상청api 불안정함- 헤더에 { resultCode: '00', resultMsg: 'NORMAL_SERVICE' } 확인되야 정상
            //에러코드 참고  -> https://www.nanumtip.com/qa/41692/
            //console.log(res2.data.response.body.items)
            res.send(res2.data.response.body.items)
        })
}
