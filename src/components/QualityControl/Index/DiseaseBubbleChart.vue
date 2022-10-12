<template>
  <div>
    <div id="DiseaseBubble" style="width: 100%; height: 90%"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import { onMounted, watch,toRef } from 'vue'
import {diseaseBubbleData} from '../../../Entites/E_QualityControl'
const props = defineProps({
  propchardata: Array<diseaseBubbleData>
})


let myChart: any = null
let propchardata = toRef(props,'propchardata');
watch(propchardata, () => {
  changeChart();
});

const changeChart = () => {
  if (!myChart) myChart = echarts.init(document.getElementById('DiseaseBubble') as HTMLElement)
  var chardata = propchardata.value!
  var [maxValue, temp] = [0, [] as Array<any>]
  console.log('diseaseBubbleData',chardata)
  chardata.forEach((item) => {
    temp.push(item.DiseasePatCount)
  })

  maxValue = Math.max.apply(null, temp)
  // 气泡颜色数组
  const color = [
    'rgb(255,202,149)',
    'rgb(165,219,197)',
    'rgb(193,191,252)',
    'rgb(191,218,255)',
    'rgb(246,219,143)',
    // '#FAC858',
    // '#FACD91',
    // '#516CC0',
    // '#EE6666',
    // '#73C0DE',
    // '#C280FF',
    // '#91CC75',
    // '#ff7123',
    // '#ffc400',
    // '#5e333f',
  ]
  // 气泡颜色备份
  let bakeColor = [...color]
  // 气泡数据
  const bubbleData: any = []
  // 气泡基础大小
  let basicSize = 70
  // 节点之间的斥力因子,值越大,气泡间距越大
  let repulsion = 300
  // 根据气泡数量配置基础大小和斥力因子（以实际情况进行适当调整，使气泡合理分布）
  if (chardata.length >= 5 && chardata.length < 10) {
    basicSize = 50
    repulsion = 230
  }
  if (chardata.length >= 10 && chardata.length < 20) {
    basicSize = 40
    repulsion = 150
  } else if (chardata.length >= 20) {
    basicSize = 30
    repulsion = 75
  }
  // 填充气泡数据数组bubbleData
  for (const item of chardata) {
    // 确保气泡数据条数少于或等于气泡颜色数组大小时，气泡颜色不重复
    if (!bakeColor.length) bakeColor = [...color]
    const colorSet = new Set(bakeColor)
    const curIndex = Math.round(Math.random() * (colorSet.size - 1))
    const curColor = bakeColor[curIndex]
    colorSet.delete(curColor)
    bakeColor = [...colorSet]
    // 气泡大小设置
    let size = (item.DiseasePatCount * basicSize * 2) / maxValue
    if (size < basicSize) size = basicSize
    bubbleData.push({
      name: item.DiseaseName,
      value: item.DiseasePatCount,
      symbolSize: size,
      draggable: true,
      itemStyle: {
        color: curColor,
      },
    })
  }
  const bubbleOptions = {
    title: { text: '抢救病种统计', left: 'center', textStyle: { color: 'rgb(121, 126, 143)', fontSize: 15 } },
    // backgroundColor: '#fff',
    animationEasingUpdate: 'bounceIn',
    series: [
      {
        categories: bubbleData,
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: repulsion,
          edgeLength: 10,
        },
        // 是否开启鼠标缩放和平移漫游
        roam: false,
        label: { show: true },
        data: bubbleData,
      },
    ],
    legend: {
      orient: 'vertical',
      x: 'right',
      y: 'center',
      formatter: (name: any) => {
        let tarValue = ''
        for (let i = 0; i < bubbleData.length; i++) {
          if (bubbleData[i].name === name) {
            tarValue = bubbleData[i].value
          }
        }
        return `${name}  ${tarValue}人`
      },
    },
    tooltip: {
      formatter: function (params: any) {
        var ret = params.value + '人'
        return ret
      },
    },
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(bubbleOptions)

  window.addEventListener('resize', () => {
    if (myChart) {
      myChart.resize()
    }
  })
}
onMounted(() => {
  changeChart()
})
</script>
<style scoped lang='less'>
.TitleStyle {
  width: 100%;
  height: 10%;
  color: rgb(121, 126, 143);
  padding-top: 10%;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>