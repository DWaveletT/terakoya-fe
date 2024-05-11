<template>
    <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="currentData.total"
        v-model:current-page="page"
        style="justify-content: right; margin-bottom: 1em;"
    />

    <el-table :data="currentData.users" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="名称" min-width="100" />
        <el-table-column prop="role" label="权限" width="100">
            <template #default="user">
                {{ user.row.role === 1 ? '普通' : '管理' }}
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
            <template #default="user">
                <el-button type="primary" plain @click="prepareUserEdit(user.row)">授权</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="currentData.total"
        v-model:current-page="page"
        style="justify-content: right; margin-top: 1em;"
    />
    
    <el-dialog width="400px" v-model="show" title="修改权限">
        <el-form class="form-area" :label-width="'auto'" >
            <el-form-item label="用户名称">
                <el-input disabled v-model="user.name" />
            </el-form-item>
            <el-form-item label="用户 ID">
                <el-input disabled v-model="user.id" />
            </el-form-item>
            <el-form-item label="用户权限">
                <el-select v-model="user.role">
                    <el-option :value="1">普通用户</el-option>
                    <el-option :value="2">管理用户</el-option>
                </el-select>
            </el-form-item>
            
        </el-form>

        <div class="submit-area">
            <el-button type="primary" @click="doUserUpdate">提交</el-button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">

import {
    ElTable,
    ElTableColumn,
    ElButton,
    ElPagination,
    ElNotification,
    ElDialog,
    ElForm,
    ElFormItem,
    ElSelect,
    ElOption,
    ElInput
} from 'element-plus';


import { useTestdata } from '@/stores/test';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import type { BgUser, ErrorResponse, User } from '@/interface';
import { onMounted, ref, watch } from 'vue';
import { useAuth } from '@/stores/auth';
import { useUtil } from '@/stores/util';
import { useRouter } from 'vue-router';

const auth = useAuth();
const util = useUtil();

const router = useRouter();

const page = ref(1);
const show = ref(false);

const user = ref<User>(null!);

const currentData = ref({
    total: 0,
    users: [] as User[]
});

interface UserListResponse {
    postCount: number,
    users: BgUser[]
}

async function queryUserList(){
    await axios<UserListResponse>({
        url: 'http://43.143.171.43:9999/api/user/list',
        method: 'POST',
        data: {
            page: page.value,
            token: auth.getToken()
        },
        withCredentials: true
    })
    .then((e: AxiosResponse<UserListResponse>) => {
        currentData.value.users = [];
        currentData.value.total = e.data.postCount;

        e.data.users.forEach((bgUser) => { currentData.value.users.push(util.conveyUser(bgUser)); });
    })
    .catch((e: AxiosError) => {
        let response = e.response;
        if(!response || !response.data){
            ElNotification({
                title: '未知错误',
                message: '',
                type: 'error',
            });
        } else {
            ElNotification({
                title: '用户列表获取失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });

            if(e.response?.status === 401){
                router.push({ name: 'login' });
            }
        }
    });
}

function prepareUserEdit(u: User){
    user.value = u;
    show.value = true;
}

async function doUserUpdate(){
    await axios({
        url: 'http://43.143.171.43:9999/api/user/updateRole',
        method: 'POST',
        data: {
            useridint: user.value.id,
            role: user.value.role,
            token: auth.getToken()
        },
        withCredentials: true
    })
    .then(() => {
        
        ElNotification({
            title: '授权成功',
            message: '',
            type: 'success',
        });

        show.value = false;
    })
    .catch((e: AxiosError) => {
        let response = e.response;
        if(!response || !response.data){
            ElNotification({
                title: '未知错误',
                message: '',
                type: 'error',
            });
        } else {
            ElNotification({
                title: '权限修改失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });

            if(e.response?.status === 401){
                router.push({ name: 'login' });
            }
        }
    });
}

onMounted(() => {
    queryUserList();
});

watch(page, () => {
    queryUserList()
});

</script>

<style scoped lang="scss">
</style>