import { defineStore } from 'pinia'
import { ErWorkover } from '../Entites/E_Workover'

export const useSearchStore = defineStore('AppStore', {
    state: () => {
        return {
            searchDateRange: {
                startDate: new Date(),
                endData: new Date(),
                IsMonth: false
            },
            ErWorkoverData: new ErWorkover()
        }
    },
    actions: {
        ChangeSearchDate(startDate: Date, endData: Date, IsMonth: boolean = false) {
            this.searchDateRange = {
                startDate: startDate,
                endData: endData,
                IsMonth: IsMonth
            }
        }
    }
})