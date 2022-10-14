<template>
    <div id="chart">

    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ErReceiveClinicCount } from '../../../../../Entites/E_Workover'
import { onMounted, inject, watch } from 'vue';

var R_ErWorkoverData: any = inject('R_ErWorkoverData')
var searchDateRange: any = inject('searchDateRange')
let source: any = [];
let myChart: any = undefined
let Title = '';
watch(R_ErWorkoverData, () => {
    var startDate: Date = searchDateRange.startDate
    let mouthNumber: number = startDate.getMonth()
    let year: number = startDate.getFullYear();
    Title = ''
    Title = `${year}.${mouthNumber}-${year}.${mouthNumber + 2} ` + '急诊科接诊工作量变化趋势'
    source = [];
    source.push(['月份', mouthNumber + '月', (mouthNumber + 1) + '月', (mouthNumber + 2) + '月'])
    R_ErWorkoverData.erReceiveClinicCounts.forEach((x: ErReceiveClinicCount) => {
        source.push([x.xName, x.lstCountPat[0], x.lstCountPat[1], x.lstCountPat[2]])
    });
    console.log(source)
    GetChart();
})
onMounted(() => {
    GetChart();
})


const GetChart = () => {
    var app: any = {};
    type EChartOption = echarts.EChartOption

    var chartDom = document.getElementById('chart')!;
    if (!myChart) myChart = echarts.init(chartDom);
    var option: EChartOption;

    option = {
        title: {
            text: Title,
            left: 'center'
        },
        legend: { bottom: 10 },
        tooltip: {},
        dataset: {
            source: source
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                interval: 0,
                rotate: 0
            },
        },
        yAxis: {},
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    };
    myChart.resize()
    option && myChart.setOption(option, true);
}


</script>
<style scoped lang='less'>
#chart {
    width: 100%;
    height: 100%;
}
</style>