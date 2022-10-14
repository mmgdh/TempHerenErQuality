<template>
    <div class="Grid-FourLayout">
        <div class="Grid-One">
            <ReceiveCLinicChart></ReceiveCLinicChart>
        </div>
        <div class="Grid-Two">
            <CureChart></CureChart>
        </div>
        <div class="Grid-Three">
            <RescuePatPercentChart></RescuePatPercentChart>
        </div>
        <div class="Grid-Four">
            123123
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import ReceiveCLinicChart from './mouthChart/ReceiveClinicChart.vue'
import CureChart from './mouthChart/CureChart.vue'
import RescuePatPercentChart from './mouthChart/RescuePatPercentChart.vue'


</script>
<style scoped lang='less'>
</style>