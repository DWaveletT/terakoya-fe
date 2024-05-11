<template>
    <common-layout
        :bread="[
            {label: '寺子屋', name: 'home'},
        ]" title="登录">
            <div class="main">
                <el-card class="card">
                    <h2 class="title">账号登录</h2>
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
                            <el-link @click="register = true">注册账号</el-link>
                            <!-- <el-link>忘记密码</el-link> -->
                        </el-space>
                        <el-button type="primary" @click="doLogin">提交</el-button>
                    </div>
                </el-card>
            </div>

            <user-create v-model="register" @requestLogin="register = false" />

    </common-layout>
</template>

<script setup lang="ts">

import CommonLayout from '@/components/layout/CommonLayout.vue';

import {
    ElNotification,
    ElCard,
    ElSpace,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElLink
} from 'element-plus';

import UserCreate from '@/components/user/UserCreate.vue';

import type { ErrorResponse } from '@/interface';
import { useAuth } from '@/stores/auth';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');

const register = ref(false);

const auth = useAuth();
const router = useRouter();


interface LoginResponse {
    id: number,
    username: string,
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

        ElNotification({
            title: '登录成功',
            message: '',
            type: 'success',
        });

        auth.setUser({
            id: e.data.id,
            name: e.data.username,
            role: e.data.role,
        });

        auth.setLogin(true);
        auth.setToken(e.data.token);

        router.push({ name: "home" });
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
.main {
    margin: 1em auto;

    display: flex;
    align-items: center;
    justify-content: center;

    .title {
        text-align: center;
        margin-bottom: 1em;
    }
}

.form-area {
    height: 40vh;
    width: 360px;
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
