<template>

    <el-table :data="currentData.boards" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="名称" width="150" />
        <el-table-column prop="description" label="描述" min-width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
            <template #default>
                <el-button type="primary" plain>编辑</el-button>
                <el-button type="danger" plain>删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-button plain class="create-button" @click="show = true">新建版块</el-button>

    <el-dialog width="400px" v-model="show" title="新建板块">
        <el-form class="form-area">
            <el-form-item label="板块名称">
                <el-input v-model="board.name" />
            </el-form-item>
            <el-form-item label="板块描述">
                <el-input v-model="board.description" />
            </el-form-item>
        </el-form>

        <div class="submit-area">
            <el-button type="primary" @click="doBoardCreate">提交</el-button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">

import { ElTable, ElTableColumn, ElButton, ElPagination, ElNotification } from 'element-plus';
import { ElDialog, ElForm, ElFormItem, ElInput } from 'element-plus';

import { useTestdata } from '@/stores/test';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import type { Board, ErrorResponse } from '@/interface';

import { onMounted, ref, watch } from 'vue';
import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useInfo } from '@/stores/config';

const testdata = useTestdata();

const board = ref<Board>({
    id: null!,
    name: '',
    description: ''
});

const show = ref(false);

const currentData = ref({
    boards: [] as Board[]
});

const auth = useAuth();
const config = useInfo();
const router = useRouter();

interface BoardListResponse {
    boardCount: number,
    boards: Board[]
}

async function queryBoardList(){
    config.getBoards().then((b) => currentData.value.boards = b);
}

onMounted(() => {
    queryBoardList();
});

interface BoardCreateResponse {

}

async function doBoardCreate(){
    axios({
        url: 'http://43.143.171.43:9999/api/board/create',
        method: 'POST',
        data: {
            id: 0,
            name: board.value.name,
            description: board.value.description,
            token: auth.getToken()
        },
        withCredentials: true
    }).then((e: AxiosResponse) => {

        show.value = false;

        ElNotification({
            title: '创建成功',
            message: '',
            type: 'success',
        });

        queryBoardList();

    }).catch((e: AxiosError) => {
        let response = e.response;
        if(!response || !response.data){
            ElNotification({
                title: '未知错误',
                message: '',
                type: 'error'
            });
        } else {
            ElNotification({
                title: '创建失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });

            if(e.response?.status === 401){
                router.push({ name: 'login' });
            }
        }
    });
}

</script>

<style scoped lang="scss">
.form-area {
    min-height: 40vh;
}

.create-button {
    margin-top: 1em;
    width: 100%;
}
</style>