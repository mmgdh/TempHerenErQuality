<template>
    <div id="RescuePatPercentMain">

    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';

type EChartOption = echarts.EChartOption

onMounted(() => {
    GetChart()
})

const GetChart = () => {
    var chartDom = document.getElementById('RescuePatPercentMain')!;
    var myChart = echarts.init(chartDom);
    var option: EChartOption;

    const categories = (function () {
        let now = new Date();
        let res = [];
        let len = 10;
        while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
            now = new Date(+now - 2000);
        }
        return res;
    })();
    const data: number[] = (function () {
        let res = [];
        let len = 10;
        while (len--) {
            res.push(Math.round(Math.random() * 1000));
        }
        return res;
    })();
    const data2: number[] = (function () {
        let res = [];
        let len = 0;
        while (len < 10) {
            res.push(+(Math.random() * 10 + 5).toFixed(1));
            len++;
        }
        return res;
    })();

    option = {
        title: {
            text: 'Dynamic Data',
            left:'center'
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
            right :'1px',
            top:'center'

        },
        grid:{
            right:'160px'
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: categories
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: 'Price',
                max: 30,
                min: 0,
                boundaryGap: [0.2, 0.2]
            },
            {
                type: 'value',
                scale: true,
                name: 'Order',
                max: 1200,
                min: 0,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [
            {
                name: 'Dynamic Bar',
                type: 'bar',
                data: data,

            },
            {
                name: 'Dynamic Line',
                type: 'line',
                data: data2
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