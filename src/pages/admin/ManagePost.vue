<template>
    <div class="filter">
        
    </div>
    <el-pagination
        :page-size="50"
        :pager-count="11"
        layout="prev, pager, next"
        :total="currentData.total"
        style="justify-content: right; margin-bottom: 1em;"
    />

    <el-table :data="currentData.posts" stripe style="width: 100%; text-wrap: nowrap; text-overflow: ellipsis;">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="time" label="发布时间" width="120" />
        <el-table-column label="发布用户" width="100">
            <template #default="user">
                {{ user.row.poster.name }}
            </template>
        </el-table-column>
        <el-table-column prop="board" label="发布版块" width="100" />
        <el-table-column prop="title" label="标题" min-width="100" />
        <el-table-column fixed="right" label="操作" width="160">
            <template #default>
                <el-button type="primary" plain>编辑</el-button>
                <el-button type="danger" plain>删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination
        :page-size="50"
        :pager-count="11"
        layout="prev, pager, next"
        :total="currentData.total"
        style="justify-content: right; margin-top: 1em;"
    />
</template>

<script setup lang="ts">

import { ElTable, ElTableColumn, ElButton, ElPagination, ElNotification } from 'element-plus';

import { useTestdata } from '@/stores/test';
import type { BgPost, ErrorResponse, Post } from '@/interface';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useAuth } from '@/stores/auth';
import { useUtil } from '@/stores/util';

const page = ref(1);
const boardId = ref(0);

const auth = useAuth();
const util = useUtil();

const currentData = ref({
    total: 0,
    posts: [] as Post[]
});

type PostListResponse = BgPost[];

async function queryPostList(){
    await axios<PostListResponse>({
        url: 'http://43.143.171.43:9999/api/post/list',
        method: 'POST',
        data: {
            page: page.value,
            bid: boardId.value,
            token: auth.getToken()
        },
        withCredentials: true
    })
    .then((e: AxiosResponse<PostListResponse>) => {
        currentData.value.posts = [];
        currentData.value.total = e.data.length;

        e.data.forEach((bgPost) => { currentData.value.posts.push(util.conveyPost(bgPost)); });
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
        }
    });
}

onMounted(() => {
    queryPostList();
});

watch([page, boardId], () => {
    queryPostList();
});

</script>

<style scoped lang="scss">
</style>