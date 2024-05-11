<template>
    <el-pagination
        :page-size="50"
        :pager-count="11"
        layout="prev, pager, next"
        :total="currentData.total"
        style="justify-content: right; margin-bottom: 1em;"
    />

    <el-table :data="currentData.replies" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="time" label="发布时间" width="120" />
        <el-table-column label="发布用户" width="100">
            <template #default="user">
                {{ user.row.replyer.name }}
            </template>
        </el-table-column>
        <el-table-column prop="post" label="发布帖子" width="100" />
        <el-table-column prop="content" label="内容" min-width="100">
            <template #default="reply">
                <span style="text-wrap: nowrap; text-overflow: hidden;">{{ reply.row.content }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="like" label="点赞量" width="100" />
        <el-table-column prop="dislike" label="点踩量" width="100" />
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
import { useAuth } from '@/stores/auth';
import { useUtil } from '@/stores/util';
import { onMounted, ref, watch } from 'vue';
import type { BgReply, ErrorResponse, Reply } from '@/interface';
import axios, { AxiosError, type AxiosResponse } from 'axios';

const page = ref(1);
const replyer = ref(0);

const auth = useAuth();
const util = useUtil();

const currentData = ref({
    total: 0,
    replies: [] as Reply[]
});

type PostListResponse = BgReply[];

async function queryPostList(){
    await axios<PostListResponse>({
        url: 'http://43.143.171.43:9999/api/reply/list',
        method: 'POST',
        data: {
            page: page.value,
            token: auth.getToken()
        },
        withCredentials: true
    })
    .then((e: AxiosResponse<PostListResponse>) => {
        currentData.value.replies = [];
        currentData.value.total = e.data.length;

        e.data.forEach((bgPost) => { currentData.value.replies.push(util.conveyReply(bgPost)); });
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
                title: '回复列表获取失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });
        }
    });
}

onMounted(() => {
    queryPostList();
});

watch([page, replyer], () => {
    queryPostList();
});

</script>

<style scoped lang="scss">
</style>