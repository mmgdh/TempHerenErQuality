<template>
  <div>
    <div class="TitleStyle">就诊发应时间达标占比</div>
    <div class="PercentStyle">
      <div class="TextDisplayStyle">
        <span>达标</span>
        <span>超时</span>
      </div>
      <a-progress :percent="100" :success="{ percent: successvalue }" :show-info="false" />
      <div class="TextDisplayStyle">
        <span>{{ successvalue }}%</span>
        <span>{{ 100 - successvalue! }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { successvalue } = defineProps({
  successvalue: Number
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

.PercentStyle {
  width: 100%;
  height: 90%;
  padding: 10%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-flow: column;
}

.TextDisplayStyle {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>