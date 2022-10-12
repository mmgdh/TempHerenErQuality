<template>
  <div>
    <div id="TimePatNumContainer" style="height: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, watch,reactive, toRef } from 'vue';

const props = defineProps({
  propchardata: Array<any>
})

let myChart: any = undefined
const propchardata = toRef(props,'propchardata')
const changeChart = () => {
  if (!myChart) myChart = echarts.init(document.getElementById('TimePatNumContainer') as HTMLElement)
  const xAxisData: any = []
  const seriesData: any = []
  if (!propchardata.value) return
  const ColorData = ['rgb(97,204,149)', 'rgb(61,121,255)', 'rgb(255,200,150)']
  propchardata.value.forEach((element, index) => {
    xAxisData.push(element.ImportantTimeName)
    seriesData.push({
      value: element.PatCount,
      itemStyle: {
        color: ColorData[index],
      },
    })
  })

  var option = {
    title: { text: '重点时段就诊人员', left: 'center', textStyle: { color: 'rgb(121, 126, 143)', fontSize: 15 } },
    xAxis: {
      data: xAxisData,
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: seriesData,
        itemStyle: {
          borderRadius: 10,
          borderWidth: 0.1,
          shadowBlur: 3,
        },
        barWidth: '20%',
      },
    ],
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)

  window.addEventListener('resize', () => {
    if (myChart) {
      myChart.resize()
    }
  })
}
watch(propchardata, () => {
  changeChart();
})
onMounted(() => {
  changeChart()
})
</script>
<style scoped lang='less'>

</style>