import { defineStore } from 'pinia'

interface SystemStore {
    isCollapse: boolean

}

export const useSystemStore = defineStore('systemStore', {
    state: (): SystemStore => {
        return {
            isCollapse: false,
        }
    },
})