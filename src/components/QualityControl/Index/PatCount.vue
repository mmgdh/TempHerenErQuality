<template>
  <div class="mainStyle">
    <span class="TitleStyle">{{ title }}:</span>
    <span class="countStyle">{{ patcount }}</span>
    <span class="TextStyle">人</span>
    <span class="percentStyle">{{ PatCountPercent }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';


const props = defineProps({
  title: String, patcount: Number, percent: String
})
let percent = props.percent
const PatCountPercent = computed(() => {
  if (percent) return percent + '%'
  return ''
})
</script>
<style scoped lang='less'>
.mainStyle {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
}

.TitleStyle {
  color: rgb(121, 126, 143);
}

.countStyle {
  font-size: 40px;
}

.TextStyle {
  padding-right: 20%;
}

.percentStyle {
  color: #91cc75;
  padding-right: 10%;
}
</style>