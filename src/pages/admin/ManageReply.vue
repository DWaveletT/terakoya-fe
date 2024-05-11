<template>


    <h3>查询结果<span style=" margin-left: 1em; font-size: small; font-weight: normal;">共 {{ currentData.total }} 条</span></h3>

    <el-pagination
        :page-size="50"
        :pager-count="11"
        layout="prev, pager, next"
        :total="currentData.total"
        v-model:current-page="page"
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
        <el-table-column fixed="right" label="操作" width="160">
            <template #default="reply">
                <el-button type="primary" plain @click="prepareEdit(reply.row)">编辑</el-button>
                <el-button type="danger" plain @click="prepareDelete(reply.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    
    <el-dialog width="400px" v-model="show" title="修改回复">
        <el-form class="form-area">
            <el-form-item label="发布用户">
                <el-input disabled v-model="reply.replyer.name" />
            </el-form-item>
            <el-form-item label="发布帖子">
                <el-input disabled v-model="reply.post" />
            </el-form-item>
            <el-form-item label="发布内容">
                <el-input type="textarea" resize="vertical" autosize v-model="reply.content" />
            </el-form-item>
        </el-form>

        <div class="submit-area">
            <el-button type="primary" @click="doReplyEdit">提交</el-button>
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
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElMessage,
    ElMessageBox
} from 'element-plus';

import { useAuth } from '@/stores/auth';
import { useUtil } from '@/stores/util';
import { onMounted, ref, watch } from 'vue';
import type { BgReply, ErrorResponse, Reply } from '@/interface';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import { useRouter } from 'vue-router';

const page = ref(1);
const replyer = ref(0);

const show = ref(false);

const auth = useAuth();
const util = useUtil();
const router = useRouter();

const reply = ref<Reply>(null!);
const keyword = ref('');

const currentData = ref({
    total: 0,
    replies: [] as Reply[]
});

interface ReplyListResponse {
    postCount: number,
    replys: BgReply[]
}

async function queryReplyList(){
    await axios<ReplyListResponse>({
        url: 'http://43.143.171.43:9999/api/reply/list',
        method: 'POST',
        data: {
            page: page.value,
            poster: keyword.value,
            token: auth.getToken()
        },
        withCredentials: true
    })
    .then((e: AxiosResponse<ReplyListResponse>) => {
        currentData.value.replies = [];
        currentData.value.total = e.data.postCount;

        e.data.replys.forEach((bgReply) => { currentData.value.replies.push(util.conveyReply(bgReply)); });
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
            if(e.response?.status === 401){
                router.push({ name: 'login' });
            }
        }
    });
}



function prepareEdit(p: Reply){
    reply.value = p;
    show.value = true;
}

async function doReplyEdit(){
    axios({
        url: 'http://43.143.171.43:9999/api/reply/edit',
        method: 'POST',
        data: {
            rid: reply.value.id,
            content: reply.value.content,
            token: auth.getToken()
        },
        withCredentials: true
    }).then((e: AxiosResponse) => {
        ElMessage({
            type: 'success',
            message: '修改成功',
        });

        show.value = false;
        queryReplyList();

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

function prepareDelete(p: Reply){
    reply.value = p;
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
        url: 'http://43.143.171.43:9999/api/reply/delete',
        method: 'POST',
        data: {
            rid: reply.value.id,
            token: auth.getToken()
        },
        withCredentials: true
    }).then((e: AxiosResponse) => {
        ElMessage({
            type: 'success',
            message: '删除成功',
        });
        
        queryReplyList();

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
    queryReplyList();
});

watch([page, replyer], () => {
    queryReplyList();
});

</script>

<style scoped lang="scss">
</style>