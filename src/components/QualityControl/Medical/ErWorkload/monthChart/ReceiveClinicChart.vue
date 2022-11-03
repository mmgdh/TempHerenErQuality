<template>
    <div id="chart">

    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ErReceiveClinicCount } from '../../../../../Entites/E_Workover'
import { onMounted, inject, watch, ref } from 'vue';
import { useSearchStore } from '../../../../../store/SearchStore'
import { storeToRefs } from 'pinia';
const SearchStore = useSearchStore()
const refSeachStore = storeToRefs(SearchStore)

let source: any = ref([]);
let myChart: any = undefined
let Title = ref('');
watch(refSeachStore.ErWorkoverData, () => {
    var startDate: Date = SearchStore.searchDateRange.startDate
    let monthNumber: number = startDate.getMonth()
    let year: number = startDate.getFullYear();
    Title.value = `${year}.${monthNumber}-${year}.${monthNumber + 2} ` + '急诊科接诊工作量变化趋势'
    source.value = [];
    source.value.push(['月份', monthNumber + '月', (monthNumber + 1) + '月', (monthNumber + 2) + '月'])
    refSeachStore.ErWorkoverData.value.erReceiveClinicCounts.forEach((x: ErReceiveClinicCount) => {
        source.value.push([x.xName, x.lstCountPat[0], x.lstCountPat[1], x.lstCountPat[2]])
    });
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
            text: Title.value,
            left: 'center'
        },
        legend: { bottom: 10 },
        tooltip: {},
        dataset: {
            source: source.value
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                interval: 0,
                // rotate: 20//控制文字倾斜，如果科室多了可以用这个效果
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