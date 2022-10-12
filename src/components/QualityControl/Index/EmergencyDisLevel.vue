<template>
  <div>
    <div id="main" style="height: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, watch,toRef } from 'vue';
import { diseLevelChartData } from '../../../Entites/E_QualityControl'
const Props = defineProps({
  item: { type: Array<diseLevelChartData>, default: null }
})
const item = toRef(Props,'item')
let myChart: any = null
const changeChart = () => {
  const DisLevlData: any = []
  if (!item) return
  item.value.forEach((element) => {
    DisLevlData.push({
      value: element.LevelCountValue,
      name: element.LevelName,
      itemStyle: { color: element.LevelColor },
    })
  })
  if (myChart == null) myChart = echarts.init(document.getElementById('main') as HTMLElement)
  var option = {
    title: { text: '急诊病人分级情况', left: 'center', textStyle: { color: 'rgb(121, 126, 143)', fontSize: 15 } },
    series: [
      {
        type: 'pie',
        data: DisLevlData,
        zlevel: 1,
        label: {
          show: true,
          position: 'inner',
          color: '#fff',

          formatter: '{d}%',
          fontWeight: 'bold',
        },
      },
      {
        type: 'pie',
        data: DisLevlData,
        zlevel: 0,
        label: {
          show: true,
          position: 'outer',
          alignTo: 'edge',
          edgeDistance: 10,
          overflow: 'none',
          formatter: '{b}\n\n{c}人',
        },
      },
    ],
    legend: {
      top: 'bottom',
    },
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)

  window.addEventListener('resize', () => {
    if (myChart) {
      myChart.resize()
    }
  })
}
onMounted(() => {
  changeChart()
})
watch(item, () => {
  console.log('Dislevel',item)
  changeChart()
})

</script>
<style scoped lang='less'>

</style>