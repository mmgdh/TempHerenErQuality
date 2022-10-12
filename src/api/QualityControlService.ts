import { requestGet } from './request'
import {IndexAllInfo} from '../Entites/E_QualityControl'
const api = {
    Test: '/QualityControl/Index',
    GetChartData: '/QualityControl/GetChartData'
}

export function Test() {
    return requestGet(
        api.Test,
        { test: '123' }
    )
}

export function GetChartData(startdate: string, enddate: string):any {
    return requestGet(
        api.GetChartData,
        { startdate: startdate, enddate: enddate }
    )
}