<template>
    <div class="Body">
        <div class="header">
            <span>时间类型：</span>
            <span class="DateTimeType">
                <a-select default-value="月" v-model:value="DateType" style="width: 120px">
                    <a-select-option value="月"> 月 </a-select-option>
                    <a-select-option value="季度"> 季度 </a-select-option>
                    <a-select-option value="年"> 年 </a-select-option>
                </a-select>
                <a-date-picker v-show="DateType == '月'" v-model:value="month" picker="month" />
                <a-range-picker v-show="DateType == '年'" v-model:value="year" picker="month" />
                <a-date-picker v-show="DateType == '季度'" v-model:value="season" picker="quarter" />
                <a-button type="primary" @click="SearchFunc">
                    <template #icon>
                        <SearchOutlined />
                    </template>
                    搜索
                </a-button>
            </span>
            <div class="Nav">
                <a-menu v-model="current" mode="horizontal" @click="onMenuSelect">
                    <a-menu-item key="/ErWorkload">急诊科工作量</a-menu-item>
                    <a-menu-item key="2">科室收入</a-menu-item>
                    <a-menu-item key="3">医疗质控指标</a-menu-item>
                    <a-menu-item key="4">医疗文书书写</a-menu-item>
                    <a-menu-item key="5">科研教学</a-menu-item>
                </a-menu>
            </div>
        </div>
        <router-view class="IndexContainer" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, provide } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'vue-router'
import { SearchOutlined } from '@ant-design/icons-vue';
import { useSearchStore } from '../../../store/SearchStore'

let router = useRouter()
let SearchStore = useSearchStore()


type RangeValue = [Dayjs, Dayjs];
let DateType = ref('月'),
    month = ref<Dayjs>(),
    season = ref<RangeValue>(),
    year = ref<RangeValue>(),
    current = ref('')


const onMenuSelect = (item: any) => {
    router.push(item.key)
}

const SearchFunc = () => {
    if (DateType.value == '月') {
        SearchStore.ChangeSearchDate(month.value!.add(-2, 'month').startOf('month').toDate(), month.value!.endOf('month').toDate(), true)
    }
}
</script>
<style scoped lang='less'>
.header {

    span {
        padding-left: 2rem;
    }
}

.IndexContainer {
    height: 100%;
    background-color: beige;
}
</style>