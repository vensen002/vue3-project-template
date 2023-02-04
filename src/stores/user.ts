import {defineStore} from "pinia";
import type { UserInfo, MenuInfo } from "@/interface/userInfo";

export interface UserStore {
    token: string
    userInfo: UserInfo | null,
    menuList: MenuInfo[]
}

export const useUserStore = defineStore('userStore', {
    state: (): UserStore => {
        return {
            token: '',
            userInfo: null,
            menuList: [],
        }
    }
})