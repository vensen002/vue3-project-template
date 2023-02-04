import request from "@/utils/request";
import type { Result } from "@/api/requestType";
import type { MenuInfo, UserInfo } from "@/interface/userInfo"

interface LoginResult extends Result {
    menuList?: MenuInfo[];
    authorization?: string;
    currentUser?: UserInfo;
}

export interface LoginForm {
    username: string;
    password: string;
    rememberMe: boolean;
}
/**
 * （不建议写成 request.post(xxx)，因为这样 post 时，无法 params 与 data 同时传参）
 *
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 */
export function useLoginApi() {
    return {
        login: (params: LoginForm): Promise<LoginResult> => {
            return request({
                url: 'login',
                method: 'post',
                params: params,
            });
        },
        signOut: (data: object) => {
            return request({
                url: '/user/signOut',
                method: 'post',
                data,
            });
        },
    };
}