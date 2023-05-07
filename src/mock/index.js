//引入mock.js
import Mock from 'mockjs'
import { generateData } from '@/utils/index'

Mock.mock('/api/country', 'get', {
    "status": 200,
    "content": [
        {
            "label": "America",
            "value": 0
        },
        {
            "label": "Australian",
            "value": 1
        }
    ]
})

Mock.mock('/api/area', 'get', {
    "status": 200,
    "content|5": [() => generateData()]
})

//查询所有
Mock.mock('/api/holidays/info', 'get', {
    "status": 200,
    "content|10": [{
        "id|+1": 1,
        "name": "@name",
        "startDate": "@datetime()",
        "endDate": "@datetime()",
        "days|1-10": 1
    }]
})

Mock.mock('/api/holidays/weather', 'post', (option) => {

    let body = JSON.parse(option.body)

    const length = body.days
    const result = {
        status: 200,
        content: []
    }
    for (var i = 1; i <= length; i++) {
        result.content.push(Mock.mock({
            "id|+1": 1,
            "time": "@datetime()",
            "lowestTemperature|1-10": 1,
            "maximumTemperature|20-30": 1,
            "status|0-3": 1
        }))
    }

    return result
})

Mock.mock('/api/holidays/lease', 'post', (option) => {

    let body = JSON.parse(option.body)
    let length = body.days
    const result = {
        status: 200,
        content: []
    }
    const addressList = [
        '7190-C Elder Lane Sun Prairie WI 53590',
        '500 Salisbury St Worcester MA 01609-1296',
        '350 Bernardsville Rd Mendham NJ 07945-2923',
        '2656 S Loop W Ste 380 Houston TX 77054 USA',
        '7351 Spring Hill Drive, Suite 11 Spring Hill FL 34606',
        '10200 Linn Station Rd Ste 125 Louisville KY 40223',
        '21 Rockview Avenue North Plainfield NJ 07060-0000 USA',
        '2035 Vauxhall Road Union NJ 07083-3618 USA',
        '1227 47th Street Brooklyn NY 11219 USA',
        '7120 Highway 52 Greenfield Park NY 12435-5308 USA',
        '2431 Aviation Avenue, Suite 703 North Charleston SC 29406 USA'
    ]
    for (var i = 1; i <= 10; i++) {
        result.content.push(Mock.mock({
            "id|+1": 1,
            "name": "@word() House",
            "square|50-140": 1,
            "price|200-1500": 1,
            "status|0-9": 1,
            "duration": length,
            address: addressList[i],
            'phone': '@integer(10000000000, 99999999999)'
        }))
    }


    return result
})