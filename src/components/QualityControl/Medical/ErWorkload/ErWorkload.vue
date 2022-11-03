<template>
    <div>
        <MonthCount></MonthCount>
    </div>
</template>

<script setup lang="ts">
import { watch, inject, provide, reactive, watchEffect } from 'vue';
import MonthCount from './monthCount.vue';
import { ErWorkover } from '../../../../Entites/E_Workover'
import { GetErWorkoverChartData } from '../../../../api/QualityControlService'
import { useSearchStore } from '../../../../store/SearchStore'

const SearchStore = useSearchStore()


let ErWorkoverData: ErWorkover = new ErWorkover();
var R_ErWorkoverData = reactive(ErWorkoverData);
provide('R_ErWorkoverData', R_ErWorkoverData)
watchEffect(() => {
    if (SearchStore.searchDateRange.startDate) {
        //根据查询条件获取急诊工作量图表数据
        GetErWorkoverChartData(SearchStore.searchDateRange.startDate, SearchStore.searchDateRange.endData, SearchStore.searchDateRange.IsMonth).then((ret: ErWorkover) => {
            SearchStore.$patch((state)=>{
                state.ErWorkoverData=ret;
            })
        })
    }

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