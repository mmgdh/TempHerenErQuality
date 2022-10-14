<template>
    <div>
        <MouthCount></MouthCount>
    </div>
</template>

<script setup lang="ts">
import { watch, inject,provide, reactive } from 'vue';
import MouthCount from './mouthCount.vue';
import { ErWorkover } from '../../../../Entites/E_Workover'
import { GetErWorkoverChartData } from '../../../../api/QualityControlService'

var searchDateRange: any = inject('searchDateRange')
let ErWorkoverData: ErWorkover = new ErWorkover();
var R_ErWorkoverData = reactive(ErWorkoverData);
provide('R_ErWorkoverData',R_ErWorkoverData)
watch(searchDateRange, () => {
    GetErWorkoverChartData(searchDateRange.startDate, searchDateRange.endData, searchDateRange.IsMouth).then((ret: ErWorkover) => {
        R_ErWorkoverData.erReceiveClinicCounts = ret.erReceiveClinicCounts;
    })
})
</script>
<style  lang='less'>
@MarginNum: 0.5rem;

.Grid-FourLayout {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));

    .Grid-One {
        grid-column: 1/2;
        grid-row: 1;
        margin: @MarginNum;
    }

    .Grid-Two {
        grid-column: 2/2;
        grid-row: 1;
        margin: @MarginNum;
    }

    .Grid-Three {
        grid-column: 1/2;
        grid-row: 2;
        margin: @MarginNum;
    }

    .Grid-Four {
        grid-column: 2/2;
        grid-row: 2;
        margin: @MarginNum;
    }

}
</style>