<template>
    <div id="chart2">

    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';

onMounted(() => {
    GetChart();
})


const GetChart = () => {
    var app: any = {};
    type EChartOption = echarts.EChartOption

    var chartDom = document.getElementById('chart2')!;
    var myChart = echarts.init(chartDom);
    var option: EChartOption;

    option = {
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ['product', '2015', '2016', '2017'],
                ['Matcha Latte', 43.3, 85.8, 93.7],
                ['Milk Tea', 83.1, 73.4, 55.1],
                ['Cheese Cocoa', 86.4, 65.2, 82.5],
                ['Walnut Brownie', 72.4, 53.9, 39.1]
            ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    };

    option && myChart.setOption(option);
}


</script>
<style scoped lang='less'>
#chart2 {
    width: 100%;
    height: 100%;
}
</style>