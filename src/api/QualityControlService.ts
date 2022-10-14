import { requestGet } from './request'
import { IndexAllInfo } from '../Entites/E_QualityControl'
const QualityControl = '/QualityControl/'
const api = {
    GetChartData: QualityControl + 'GetChartData',
    GetErWorkoverChartData: QualityControl + 'GetErWorkoverChartData'
}

export function GetChartData(startdate: string, enddate: string): any {
    return requestGet(
        api.GetChartData,
        { startdate: startdate, enddate: enddate }
    )
}

export function GetErWorkoverChartData(startdate: string, enddate: string, isMonth: boolean): any {
    return requestGet(
        api.GetErWorkoverChartData,
        { startdate: startdate, enddate: enddate, isMonth:isMonth }
    )
}