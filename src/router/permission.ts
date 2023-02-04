import router from "@/router/index";
import { Session } from "@/utils/storage";

// 白名单
const whiteList: string[] = ['/login']


router.beforeEach((to, from, next) => {
    if (Session.get('token')) {
        next();
    } else {
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next('/login');
        }
    }
})