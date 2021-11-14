const { toXY } = require("./xyConvert")
const axios = require("axios")
const serviceKey = require("../../config/key")
const aqiUrl = require("../../config/url")

module.exports = async (req, res) => {
    console.log("map2.js 서버")
    console.log(req.query)
    const { lat, lon } = req.query

    function getCurrentDate() {
        //'20211102' 형식
        let date = new Date()
        let year = date.getFullYear().toString()
        let month = date.getMonth() + 1
        month = month < 10 ? "0" + month.toString() : month.toString()
        let day = date.getDate()
        day = day < 10 ? "0" + day.toString() : day.toString()
        return year + month + day
    }

    // //단기예보시간 - 예보시간은 각 3시간분
    //초단기예보시간 - 예보시간은 각 30분, api제공시간은 45분
    //base_date base_date	발표일자	8	1	20210628	‘21년 6월 28일발표
    //base_time base_time	발표시각	4	1	0500	05시 발표
    let beforeDate = 0
    function getFormatTime() {
        //9시간에 해당하는 양-hoon
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000
        //현재시각과 9시를 더해서 한국시간을 만든다 -hoon
        const curHour = new Date() + KR_TIME_DIFF
        //pm 2시 49을 이런식으로 변경->1459
        let hourMin = Number(curHour.split(" ")[4].slice(0, 5).replace(":", ""))
        //각 시각 정각에서 15분 사이일경우 15분을 빼줌(데이터가 2시,5시,8... 기상청 데이터가 정각에 들어오기 때문에 데이터 안정성을 위해서)
        //원래는 시간-숫자 체계를 고려하여 15분정도를 빼야했으나,기상청 데이터의 불안정성으로 2시간정도를 빼기로함.

        //시간이 02시 이후 일경우
        if (hourMin - 200 > 200) return hourMin - 200
        // //시간이 02시가 지나지 않았을경우 전날 마지막예보를 사용해야함
        else {
            beforeDate = -1
            return (hourMin = 2300)
        }
    }

    const toXYconvert = toXY(lat, lon)
    const url = aqiUrl.shortForecastUrl
    const ServiceKey = decodeURIComponent(serviceKey.publicPortalkey)
    // console.log(toXYconvert.lat)
    console.log(typeof hourMin)
    axios
        .get(url, {
            params: {
                serviceKey: ServiceKey,
                numOfRows: "14",
                pageNo: "1",
                dataType: "JSON",
                base_date: String(getCurrentDate() + beforeDate),
                base_time: getFormatTime(),
                nx: toXYconvert.x,
                ny: toXYconvert.y,
            },
        })
        .then((res2) => {
            // console.log(res2.data)
            //기상청api 불안정함- 헤더에 { resultCode: '00', resultMsg: 'NORMAL_SERVICE' } 확인되야 정상
            //에러코드 참고  -> https://www.nanumtip.com/qa/41692/
            //console.log(res2.data.response.body.items)
            res.send(res2.data.response.body.items.item[7])
        })
}
