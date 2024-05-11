<template>
    <el-dialog width="400px" v-model="show" title="用户登录">
        <el-form class="form-area">
            <el-form-item label="用户">
                <el-input v-model="username" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="password" type="password" />
            </el-form-item>
        </el-form>

        <div class="submit-area">
            <el-space wrap>
                <el-link @click="swtichRegister">注册账号</el-link>
                <!-- <el-link>忘记密码</el-link> -->
            </el-space>
            <el-button type="primary" @click="doLogin">提交</el-button>
        </div>
        
    </el-dialog>

    <user-create v-model="showReg" @request-login="switchLogin" />
</template>

<script setup lang="ts">
import { ElDialog } from 'element-plus';
import { ElForm, ElInput, ElFormItem, ElButton, ElLink, ElNotification } from 'element-plus';

import { ElSpace } from 'element-plus';

import UserCreate from './UserCreate.vue';

import { useAuth } from '@/stores/auth';

import { ref } from 'vue';

import axios, { AxiosError, type AxiosResponse } from 'axios';
import type { ErrorResponse } from '@/interface';

const show = defineModel<boolean>({ required: true });
const showReg = ref(false);

const username = ref('');
const password = ref('');

const auth = useAuth();

function switchLogin() {
    showReg.value = false;
    setTimeout(() => {show.value = true}, 300);
}

function swtichRegister() {
    show.value = false;
    setTimeout(() => {showReg.value = true}, 300);
}

interface LoginResponse {
    id: number,
    name: string,
    role: number,
    token: string
}

async function doLogin() {
    axios<LoginResponse>({
        url: 'http://43.143.171.43:9999/api/user/login',
        method: 'POST',
        data: {
            username: username.value,
            password: password.value
        },
        withCredentials: true
    }).then((e: AxiosResponse<LoginResponse>) => {

        console.log(e.data);

        ElNotification({
            title: '登录成功',
            message: '',
            type: 'success',
        });

        auth.setUser({
            id: e.data.id,
            name: e.data.name,
            role: e.data.role,
        });

        auth.setLogin(true);
        auth.setToken(e.data.token);

        show.value = false;
    }).catch((e: AxiosError) => {
        let response = e.response;
        if(!response || !response.data){
            ElNotification({
                title: '未知错误',
                message: '',
                type: 'error',
            });
        } else {
            ElNotification({
                title: '登录失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });
        }
    })
}

</script>

<style scoped lang="scss">
.form-area {
    min-height: 40vh;
}
.submit-area {
    display: flex;

    justify-content: space-between;
    align-items: center;
}

.interval {
    > :not(:first-child) {
        margin-left: 1em;
    }
}
</style>
