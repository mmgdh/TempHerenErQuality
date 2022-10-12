<template>
  <div>
    <div class="TitleStyle">{{ item.PercentType }}</div>
    <div :id="item.PercentType" style="width: 100%; height: 90%"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts/core'
import { onMounted, watch } from 'vue';

const props = defineProps({
  item: { PercentType: String, PercentValue: String, type: Object, default: null },
  color: String
})

let fontSize: 0.28,
  myChart: any,
  item = props.item!,
  color = props.color
const changeChart = () => {
  if (myChart == null) myChart = echarts.init(document.getElementById(item.PercentType) as HTMLElement)
  const value = item.PercentValue
  const title = '%'
  const value2 = 100 - value
  const int = value.toFixed(2).split('.')[0]

  // const float = value.toFixed(2).split('.')[1]
  // {b|.' + float + '}

  var option = {
    title: {
      text: '{a|' + int + '}{c|' + title + '}',
      x: 'center',
      y: 'center',
      textStyle: {
        rich: {
          a: {
            fontSize: 20,
            color: 'black',
          },
          c: {
            fontSize: 20,
            color: 'black',
            padding: [5, 0, 0, 0],
          },
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: '内层细圆环',
        radius: ['55%', '40%'],
        color: 'rgb(234, 236, 241)',
        animation: false,
        silent: 'ture',
        label: {
          show: false,
        },
        data: [100],
      },
      {
        type: 'pie',
        name: '外层细圆环',
        radius: ['65%', '45%'],
        silent: 'ture',
        label: {
          show: false,
        },
        data: [
          {
            name: '色彩线',
            label: {
              show: false, // 隐藏小标题
            },
            value: value,
            itemStyle: {
              color: color, // 颜色
            },
          },
          {
            value: value2,
            name: '无色线',
            itemStyle: {
              color: 'rgba(0,0,0,0)',
            },
          },
        ],
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
watch(item, () => {
  changeChart()
})
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