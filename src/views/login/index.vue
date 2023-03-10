<template>
  <div
      class="isolate w-full h-full flex items-center justify-center
             bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
    <el-card class="w-125 p-0" :body-style="{ padding: '0px' }">
      <div class="w-125">
        <div class="h-32 text-3xl font-medium text-blue-500 color- flex items-center justify-center">
          <span>欢迎您登录 后台管理系统！</span>
        </div>
        <div class="px-10 pb-8">
          <el-tabs model-value="userPwd">
            <el-tab-pane label="用户登录" name="userPwd">
              <el-form
                  ref="loginFormRef"
                  :model="loginForm"
                  :rules="loginRules"
                  class="mt-5"
              >
                <el-form-item prop="username">
                  <el-input
                      v-model="loginForm.username"
                      maxlength="16"
                      placeholder="Username"
                      prefix-icon="User"
                      :clearable="true"
                      class="h-10"
                  />
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                      v-model="loginForm.password"
                      maxlength="16"
                      placeholder="Password"
                      prefix-icon="Lock"
                      :show-password="true"
                      type="password"
                      class="h-10"
                  />
                </el-form-item>
                <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
                <el-button type="primary" class="w-full h-10 mt-5" @click="submitForm(loginFormRef)">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue"
import type {FormRules, FormInstance} from 'element-plus'
import {verifyCnAndSpace, verifyAccount, verifyPassword} from '@/utils/toolsValidate'
import Cookie from 'js-cookie'
import {encrypt, decrypt} from "@/utils/jsencrypt";
import {useLoginApi} from '@/api/login'
import type {LoginForm} from '@/api/login'
import {useUserStore} from "@/stores/user";
import type {UserInfo, MenuInfo} from "@/interface/userInfo";
import {ElMessage} from "element-plus";
import router from "@/router";
import {Session} from "@/utils/storage";


const userStore = useUserStore();
const loginFormRef = ref<FormInstance>();

const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
  rememberMe: true,
})

// 表单提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      // 是否记住密码
      loginForm.rememberMe ? setCookies() : removeCookies();
      let data = await useLoginApi().login(loginForm);
      if (data.code == 200) {
        userStore.token = <string>data.authorization
        userStore.userInfo = data.currentUser as UserInfo
        userStore.menuList = data.menuList as MenuInfo[]
        Session.set('token', userStore.token)
        ElMessage({
          message: data.msg,
          type: 'success',
        })
        await router.replace("/")
      } else {
        ElMessage.error(data.msg)
      }
    } else {
      console.log('验证失败!')
      return false
    }
  })
}

// form 校验
const loginRules = reactive<FormRules>({
  username: [{required: true, message: '请输入账号', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}]
  // username: [{ validator: onVerifyAccount, trigger: ['blur','change'] }],
  // password: [{ validator: onVerifyPassword, trigger: ['blur','change'] }]
});
// 登录账号 校验
const onVerifyAccount = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    loginForm.username = verifyCnAndSpace(value);
    if (!verifyAccount(loginForm.username)) {
      callback(new Error('字母开头，允许5-16字节，允许字母数字下划线'))
    }
    callback()
  }
}
// 密码 校验
const onVerifyPassword = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    loginForm.password = verifyCnAndSpace(value);
    if (!verifyPassword(loginForm.password)) {
      callback(new Error('以字母开头，长度在6~16之间，只能包含字母、数字和下划线'))
    }
    callback()
  }
};

// 记住账号密码
const setCookies = () => {
  Cookie.set('username', loginForm.username, {expires: 30})
  Cookie.set('password', encrypt(loginForm.password), {expires: 30})
  Cookie.set('rememberMe', loginForm.rememberMe, {expires: 30})
}
// 移除账号密码
const removeCookies = () => {
  Cookie.remove('username')
  Cookie.remove('password')
  Cookie.remove('rememberMe')
}
// 获取Cookie 中的账号密码
const getCookies = () => {
  const username: string | boolean = Cookie.get("username");
  const password: string | boolean = decrypt(Cookie.get("password"));
  const rememberMe: string | boolean = Cookie.get("rememberMe");
  loginForm.username = username ? username as string : loginForm.username;
  loginForm.password = password ? password as string : loginForm.password;
  loginForm.rememberMe = rememberMe === 'true';
}
// 加载时运行一次
getCookies()

</script>

<style scoped lang="less">

</style>
