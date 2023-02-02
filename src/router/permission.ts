import router from "@/router/index";

// 白名单
const whiteList: string[] = ['/login']

router.beforeEach((to, from, next) => {
    let token: string = '';

    if (token) {
        next();
    } else {
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next('/login');
        }
    }
})