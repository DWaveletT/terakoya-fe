<template>

    <h3>筛选器</h3>

    <el-form label-width="auto" >
        <el-form-item label="关键词">
            <el-input v-model="keyword" />
        </el-form-item>
        
    </el-form>
    
    <el-button type="primary" @click="queryPostList">查询</el-button>

    <h3>查询结果<span style=" margin-left: 1em; font-size: small; font-weight: normal;">共 {{ currentData.total }} 条</span></h3>

    <el-pagination
        :page-size="50"
        :pager-count="11"
        layout="prev, pager, next"
        :total="currentData.total"
        v-model:current-page="page"
        style="justify-content: right; margin-bottom: 1em;"
    />

    <el-table :data="currentData.posts" stripe style="width: 100%; text-wrap: nowrap; text-overflow: ellipsis;">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="time" label="发布时间" width="120" />
        <el-table-column label="发布用户" width="100">
            <template #default="post">
                {{ post.row.poster.name }}
            </template>
        </el-table-column>
        <el-table-column prop="board" label="发布版块" width="100">
            <template #default="post">
                {{ boards?.find((board) => board.id === post.row.board)?.name || '未知版块' }}
            </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="100" />
        <el-table-column fixed="right" label="操作" width="160">
            <template #default="post">
                <el-button type="primary" plain @click="prepareEdit(post.row)">编辑</el-button>
                <el-button type="danger" plain @click="prepareDelete(post.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    
    <el-dialog width="400px" v-model="show" title="修改帖子">
        <el-form class="form-area">
            <el-form-item label="帖子名称">
                <el-input v-model="post.title" />
            </el-form-item>
            <el-form-item label="帖子内容">
                <el-input type="textarea" resize="vertical" autosize v-model="post.content" />
            </el-form-item>
            <el-form-item label="帖子版块">
                <el-select v-model="post.board">
                    <el-option v-for="board in boards" :key="board.id" :value="board.id">{{ board.name }}</el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <div class="submit-area">
            <el-button type="primary" @click="doPostEdit">提交</el-button>
        </div>
    </el-dialog>

    <el-pagination
        :page-size="50"
        :pager-count="11"
        layout="prev, pager, next"
        :total="currentData.total"
        v-model:current-page="page"
        style="justify-content: right; margin-top: 1em;"
    />
</template>

<script setup lang="ts">

import {
    ElTable,
    ElTableColumn,
    ElButton,
    ElPagination,
    ElNotification,
    ElMessage,
    ElMessageBox,
    ElForm,
    ElFormItem,
    ElInput,
    ElDialog,
    ElSelect,
    ElOption
} from 'element-plus';

import type { BgPost, Board, ErrorResponse, Post } from '@/interface';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useAuth } from '@/stores/auth';
import { useUtil } from '@/stores/util';
import { useRouter } from 'vue-router';
import { useInfo } from '@/stores/config';

const page = ref(1);
const boardId = ref(0);
const show = ref(false);

const boards = ref<Board[] | null>(null);

const auth = useAuth();
const util = useUtil();
const router = useRouter();

const post = ref<Post>(null!);
const keyword = ref('');

const config = useInfo();

const currentData = ref({
    total: 0,
    posts: [] as Post[]
});

interface PostListResponse {
    postCount: number,
    posts: BgPost[]
}

async function queryPostList(){
    await axios<PostListResponse>({
        url: 'http://43.143.171.43:9999/api/post/list',
        method: 'POST',
        data: {
            page: page.value,
            bid: boardId.value,
            keyword: keyword.value,
            token: auth.getToken()
        },
        withCredentials: true
    })
    .then((e: AxiosResponse<PostListResponse>) => {
        currentData.value.posts = [];
        currentData.value.total = e.data.postCount;

        e.data.posts.forEach((bgPost) => { currentData.value.posts.push(util.conveyPost(bgPost)); });
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
                title: '帖子列表获取失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });

            if(e.response?.status === 401){
                router.push({ name: 'login' });
            }
        }
    });
}

function prepareEdit(p: Post){
    post.value = p;
    show.value = true;
}

async function doPostEdit(){
    axios({
        url: 'http://43.143.171.43:9999/api/post/edit',
        method: 'POST',
        data: {
            id: post.value.id,
            posterid: post.value.poster.id,
            releaseTime: post.value.time,
            replyTime: 114514,
            board: post.value.board,
            title: post.value.title,
            content: post.value.content,
            token: auth.getToken()
        },
        withCredentials: true
    }).then((e: AxiosResponse) => {
        ElMessage({
            type: 'success',
            message: '修改成功',
        });

        show.value = false;
        queryPostList();

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

function prepareDelete(p: Post){
    post.value = p;
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
        doPostDelete();
    })
    .catch(() => {
        ElMessage({
            type: 'info',
            message: '删除取消',
        });
    })
}

async function doPostDelete(){
    axios({
        url: 'http://43.143.171.43:9999/api/post/delete',
        method: 'POST',
        data: {
            pid: post.value.id,
            token: auth.getToken()
        },
        withCredentials: true
    }).then((e: AxiosResponse) => {
        ElMessage({
            type: 'success',
            message: '删除成功',
        });
        
        queryPostList();

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

onMounted(() => {
    config.getBoards().then((b) => boards.value = b);
    queryPostList();
});

watch([page, boardId], () => {
    queryPostList();
});

</script>

<style scoped lang="scss">
</style>