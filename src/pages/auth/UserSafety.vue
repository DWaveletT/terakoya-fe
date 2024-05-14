<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <div>
                <el-button type="danger" plain @click="doUserLogout">退出登录</el-button>

                <span style="margin-left: 1em;">将会登出所有账号。</span>
            </div>
            
            <h3 style="margin: 0.5em 0;">修改名称</h3>
            <el-form label-width="auto">
                <el-form-item label="新名称">
                    <el-input v-model="username" />
                </el-form-item>
            </el-form>

            <div class="button-container">
                <el-button type="primary" @click="doUpdateUsername">确认</el-button>
            </div>

            <h3 style="margin: -1.3em 0 0.5em 0;">修改密码</h3>
            <el-form label-width="auto">
                <el-form-item label="原始密码">
                    <el-input v-model="password0" type="password" />
                </el-form-item>
                <el-form-item label="重设密码">
                    <el-input v-model="password1" type="password" />
                </el-form-item>
                <el-form-item label="再次输入">
                    <el-input v-model="password2" type="password" />
                </el-form-item>
            </el-form>

            <div class="button-container">
                <el-button type="primary" @click="doUpdatePassword">确认</el-button>
            </div>
        </el-col>

        <el-col :span="12" class="safety-info">
            <h3>提示信息</h3>

            <p>为了防止用户名混淆，我们不允许两个用户拥有相同的用户名。因此若修改用户名后，原本的用户名被其他用户使用，则无法再修改回去。因此请谨慎修改。</p>
            
            <p>我们不会将用户的账号信息用于任何非鉴别本站身份的情境下。请放心使用。</p>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">

import type { ErrorResponse } from '@/interface';
import { useAuth } from '@/stores/auth';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import { ElCol, ElRow, ElButton, ElForm, ElFormItem, ElInput, ElNotification } from 'element-plus';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password0 = ref('');
const password1 = ref('');
const password2 = ref('');

const auth = useAuth();
const router = useRouter();

function doUserLogout(){
    axios({
        url: 'http://43.143.171.43:9999/api/user/logout',
        method: 'POST',
        data: {
            token: auth.getToken()
        },
        withCredentials: true
    }).then((e: AxiosResponse) => {

        ElNotification({
            title: '登出成功',
            message: '',
            type: 'success',
        });

        auth.setLogin(false);
        auth.setToken('');

        auth.logout();

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
                title: '登出失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });
        }
    })
}

function doUpdateUsername(){
    axios({
        url: 'http://43.143.171.43:9999/api/user/updateAuth',
        method: 'POST',
        data: {
            username: username.value,
            password: null,
            token: auth.getToken()
        },
        withCredentials: true
    }).then((e: AxiosResponse) => {

        ElNotification({
            title: '更新成功',
            message: '',
            type: 'success',
        });

        auth.logout();
        router.push({ name: 'login' });

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
                title: '更新失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });

            if(e.response?.status === 401){
                auth.logout();
                router.push({ name: 'login' });
            }
        }
    })
    
}

function doUpdatePassword(){
    if(password1.value !== password2.value){
        
        ElNotification({
            title: '修改失败',
            message: '两次密码不一致',
            type: 'warning',
        });

        return;
    }
    axios({
        url: 'http://43.143.171.43:9999/api/user/updateAuth',
        method: 'POST',
        data: {
            username: auth.currentUser.name,
            password: password1.value,
            token: auth.getToken()
        },
        withCredentials: true
    }).then((e: AxiosResponse) => {

        ElNotification({
            title: '更新成功',
            message: '',
            type: 'success',
        });

        auth.logout();
        router.push({ name: 'login' });

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
                title: '更新失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });

            if(e.response?.status === 401){
                auth.logout();
                router.push({ name: 'login' });
            }
        }
    })
}

</script>

<style scoped lang="scss">

.button-container {
    display: flex;
    justify-content: right;
}

.safety-info {
    border-left: 1px dashed var(--el-color-info);
}
</style>