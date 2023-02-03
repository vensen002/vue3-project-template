import { defineStore } from "pinia";

interface UserStore {
    token: string
}

export const useUserStore = defineStore('userStore', {
    state: (): UserStore => {
        return {
            token: '',
        }
    }
})