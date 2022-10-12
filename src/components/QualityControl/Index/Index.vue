<template>
  <div class="Body">
    <div class="DateTimeDiv">
      统计区间：
      <a-range-picker v-model:value="refDate" :format="dateFormat" @change="GetValue" />
    </div>

    <div class="TopDivContainer">
      <pat-count class="TopDiv" v-for="item in RefAllInfo.patCountDatas" :key="item.CountType" :patcount="item.CountNum"
        :title="item.CountType" :percent="item.CountPercent">
      </pat-count>
    </div>
    <div class="CenterDivContainer">
      <div class="CenterLeftDivContainer">
        <percent-chart class="CenterLeftDiv" v-for="(item, index) in RefAllInfo.PercentDatas" :key="item.PercentType"
          :item="item" :color="index % 2 == 0 ? 'rgb(77, 140, 255)' : 'rgb(255,169,114)'"></percent-chart>
      </div>
      <clinic-react-percent-page class="CenterRightDivContainer" :successvalue="RefAllInfo.ClinicReactPercent">
      </clinic-react-percent-page>
    </div>

    <div class="BottomDivContainer">
      <div class="BottomLeftDivContainer">
        <dis-level class="BottomLeftDiv1" :item="RefAllInfo.diseLevelChartDatas"></dis-level>
        <disease-bubble class="BottomLeftDiv2" :propchardata="RefAllInfo.diseaseBubbleDatas"></disease-bubble>
      </div>
      <time-pat-count class="BottomRightDivContainer" :propchardata="RefAllInfo.importantTimePats">
      </time-pat-count>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GetChartData } from '../../../api/QualityControlService'
import DisLevel from './EmergencyDisLevel.vue'
import TimePatCount from './ImportantTimePatNum.vue'
import PercentChart from './PercentChart.vue'
import DiseaseBubble from './DiseaseBubbleChart.vue'
import ClinicReactPercentPage from './ClinicReactPercent.vue'
import PatCount from './PatCount.vue'
import { onBeforeMount, reactive, ref, watch } from 'vue'
import dayjs, { Dayjs } from 'dayjs';
import { IndexAllInfo } from '../../../Entites/E_QualityControl'

const dateFormat = 'YYYY/MM/DD';

let refDate = ref<[Dayjs, Dayjs]>([
  dayjs().subtract(30, 'day'),
  dayjs(),
])

let AllInfo: IndexAllInfo = new IndexAllInfo()

let RefAllInfo = ref(AllInfo)

const GetValue = (date: any=undefined, datestring: Array<string> = []) => {
  console.log(datestring,date)
  GetChartData(datestring[0], datestring[1])
    .then((res: any) => {
      RefAllInfo.value = res
    })
    .catch((err: any) => {
      console.log(`失败: ${err.message}`)
    })
    .finally(() => { })
}
onBeforeMount(() => {
   GetValue(undefined, [dayjs().subtract(30, 'day').toString(),dayjs().toString()])
});
</script>
<style scoped>
div {
  border-radius: 5px;
}

.Body {
  background-color: rgb(223, 223, 224);
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
}

.TopDivContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  height: 10%;
}

.TopDiv {
  background-color: white;
  width: 23%;
  display: flex;
  justify-items: center;
  align-items: center;
}

.CenterDivContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  height: 30%;
}

.CenterLeftDivContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 74.4%;
}

.CenterLeftDiv {
  background-color: white;
  width: 23%;
}

.CenterRightDivContainer {
  background-color: white;
  width: 23%;
}

.BottomDivContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  height: 45%;
}

.BottomLeftDivContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 74.4%;
}

.BottomLeftDiv1 {
  background: white;
  width: 40%;
}

.BottomLeftDiv2 {
  background: white;
  width: 55%;
}

.BottomRightDivContainer {
  background-color: white;
  width: 23%;
}
</style>