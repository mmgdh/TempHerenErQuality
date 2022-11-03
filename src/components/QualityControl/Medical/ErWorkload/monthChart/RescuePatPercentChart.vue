<template>
    <div id="RescuePatPercentMain">

    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, inject, watch } from 'vue';
import { ErRescuePercent, ErWorkover } from '../../../../../Entites/E_Workover'
import { useSearchStore } from '../../../../../store/SearchStore'
import { storeToRefs } from 'pinia';
const SearchStore = useSearchStore()
const refSeachStore = storeToRefs(SearchStore)

type EChartOption = echarts.EChartOption

let myChart: any = undefined

watch(refSeachStore.ErWorkoverData, () => {
    GetChart()
})

onMounted(() => {
    GetChart()
})

const GetChart = () => {
    var chartDom = document.getElementById('RescuePatPercentMain')!;
    if (!myChart) myChart = echarts.init(chartDom);
    var option: EChartOption;

    let AllPatCount: number[] = [];
    let RescuePatCount: number[] = [];
    let DateArray: string[] = [];
    

    if (refSeachStore.ErWorkoverData) {
        refSeachStore.ErWorkoverData.value.erRescuePercents.forEach(x => {
            AllPatCount.push(x.AllPatCount);
            RescuePatCount.push(x.RescuePatCount);
            DateArray.push(x.Date);
        });
    }
    option = {
        title: {
            text: 'Dynamic Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            orient: 'vertical',
            right: '1px',
            top: 'center'

        },
        grid: {
            right: '160px'
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: DateArray
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                max: Math.max.apply(null, RescuePatCount),
                min: 0,
                boundaryGap: [0.2, 0.2]
            },
            {
                type: 'value',
                scale: true,
                max: Math.max.apply(null, AllPatCount),
                min: 0,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [
            {
                name: '总接诊人数',
                type: 'bar',
                data: AllPatCount,

            },
            {
                name: '抢救人数',
                type: 'line',
                data: RescuePatCount
            }
        ]
    };

    option && myChart.setOption(option);

}


</script>
<style scoped lang='less'>
#RescuePatPercentMain {
    width: 100%;
    height: 100%;
}
</style>