<template>

    <el-table :data="currentData.boards" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="名称" width="150" />
        <el-table-column prop="description" label="描述" min-width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
            <template #default="board">
                <el-button type="primary" plain @click="prepareEdit(board.row)">编辑</el-button>
                <el-button type="danger" plain @click="prepareDelete(board.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-button plain class="create-button" @click="showCreate = true">新建版块</el-button>

    <div>
        <el-dialog width="400px" v-model="showEdit" title="修改板块">
            <el-form class="form-area">
                <el-form-item label="板块名称">
                    <el-input v-model="board.name" />
                </el-form-item>
                <el-form-item label="板块描述">
                    <el-input v-model="board.description" />
                </el-form-item>
            </el-form>

            <div class="submit-area">
                <el-button type="primary" @click="doBoardEdit">提交</el-button>
            </div>
        </el-dialog>
    </div>

    <div>
        <el-dialog width="400px" v-model="showCreate" title="新建板块">
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
    </div>

</template>

<script setup lang="ts">

import { ElTable, ElTableColumn, ElButton, ElPagination, ElNotification, ElMessageBox, ElMessage } from 'element-plus';
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

const showEdit   = ref(false);
const showCreate = ref(false);

const currentData = ref({
    boards: [] as Board[]
});

const auth = useAuth();
const config = useInfo();
const router = useRouter();

async function queryBoardList(){
    config.getBoards().then((b) => currentData.value.boards = b);
}

onMounted(() => {
    queryBoardList();
});

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

        showCreate.value = false;

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
                auth.logout();
                router.push({ name: 'login' });
            }
        }
    });
}

function prepareEdit(b: Board){
    board.value = b;
    showEdit.value = true;
}

async function doBoardEdit(){
    axios({
        url: 'http://43.143.171.43:9999/api/board/edit',
        method: 'POST',
        data: {
            bid: board.value.id,
            name: board.value.name,
            description: board.value.description,
            token: auth.getToken()
        },
        withCredentials: true
    }).then((e: AxiosResponse) => {
        ElMessage({
            type: 'success',
            message: '修改成功',
        });

        showEdit.value = false;
        queryBoardList();

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
                title: '修改失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });

            if(e.response?.status === 401){
                router.push({ name: 'login' });
            }
        }
    });
}

function prepareDelete(b: Board){
    board.value = b;
    ElMessageBox.confirm(
    '确定要删除吗？',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
        doBoardDelete();
    })
    .catch(() => {
        ElMessage({
            type: 'info',
            message: '删除取消',
        });
    })
}

async function doBoardDelete(){
    axios({
        url: 'http://43.143.171.43:9999/api/board/delete',
        method: 'POST',
        data: {
            bid: board.value.id,
            token: auth.getToken()
        },
        withCredentials: true
    }).then((e: AxiosResponse) => {
        ElMessage({
            type: 'success',
            message: '删除成功',
        });
        
        queryBoardList();

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
                title: '删除失败',
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