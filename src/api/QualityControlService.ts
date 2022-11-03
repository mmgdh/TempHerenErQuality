import { requestGet } from './request'
import { IndexAllInfo } from '../Entites/E_QualityControl'
const QualityControl = '/QualityControl/'
const api = {
    GetChartData: QualityControl + 'GetChartData',
    GetErWorkoverChartData: QualityControl + 'GetErWorkoverChartData'
}

export function GetChartData(startdate: Date, enddate: Date): any {
    return requestGet(
        api.GetChartData,
        { startdate: startdate, enddate: enddate }
    )
}

export function GetErWorkoverChartData(startdate: Date, enddate: Date, isMonth: boolean): any {
    return requestGet(
        api.GetErWorkoverChartData,
        { startdate: startdate, enddate: enddate, isMonth:isMonth }
    )
}