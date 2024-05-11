<template>
    <common-layout
        :title="currentData.post.title"
        :bread="[
            {label: '寺子屋', name: 'home'},
            {label: '帖子列表', name: 'post.list'},
            {label: '讨论详情'}
        ]"
    >
        <el-container class="main-container">
            <el-main class="main">
                <c-bubble :user="currentData.post.poster" border-color="var(--el-color-warning)">
                    <template #header>
                        <c-username :user="currentData.post.poster" />
                        /
                        <c-date :date="new Date(currentData.post.time)" />
                        <div class="reply-operator">
                            楼主
                        </div>
                    </template>
                    <template #message>
                        <text-render :content="currentData.post.content" />
                    </template>
                </c-bubble>

                <el-pagination v-if="currentData.replys.length > 5" :page-size="50" :pager-count="7" layout="prev, pager, next" :total="currentData.total" background
                    hide-on-single-page small class="pagination" v-model:current-page="page" />

                <c-bubble v-for="i in currentData.replys" :key="i.id" :user="i.replyer">
                    <template #header>
                        <c-username :user="i.replyer" /> / <c-date :date="new Date(i.time)" />
                    </template>
                    <template #message>
                        <text-render :content="i.content" />
                    </template>
                </c-bubble>

                <el-pagination hideOnSinglePage :page-size="50" :pager-count="7" layout="prev, pager, next" :total="currentData.total" background small class="pagination" v-model:current-page="page" />

                <div ref="reply" />

                <el-card shadow="hover">
                    <h3 style="margin: 0;">回复帖子</h3>

                    <template v-if="auth.getLogin()">
                        <text-editor v-model="replyContent" placeholder="请在此处回复，支持使用 Markdown。" />
                    </template>
                    <template v-else>
                        <div class="login-area" @click="showLogin = true">
                            <span class="please-login">请先登录</span>
                        </div>
                    </template>

                    <div class="reply-buttons">
                        <el-button type="danger" plain @click="replyContent = ''">清除</el-button>
                        <el-button type="primary" @click="doReply">回复</el-button>
                    </div>
                </el-card>
                
            </el-main>

            <aside class="aside">

                <el-affix :offset="30">
                    <c-info-card>

                        <h3 style="margin: 0.5em; text-align: center;">{{ currentData.post.title }}</h3>

                        <el-divider />

                        <div class="info">
                            <div class="info-item">
                                <div><font-awesome-icon :icon="faUser" /> 楼主</div>
                                <div>{{ currentData.post.poster.name }}</div>
                            </div>
                            <div class="info-item">
                                <div><font-awesome-icon :icon="faClock" /> 发布时间</div>
                                <c-date :date="new Date(currentData.post.time)" type="detail" />
                            </div>
                            <div class="info-item">
                                <div><font-awesome-icon :icon="faComment" /> 回复个数</div>
                                <div>{{ currentData.total }}</div>
                            </div>
                        </div>
                    </c-info-card>

                    <div class="post-operator">
                        <div>
                            <el-button type="primary" plain @click="scrollToReply">回复</el-button>
                            <el-button type="danger" plain @click="confirmDelete">删除</el-button>
                        </div>
                    </div>
                </el-affix>
            </aside>
        </el-container>
    </common-layout>

    <user-login v-model="showLogin" />
    <!-- <c-nav-side /> -->
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faThumbsUp, faThumbsDown, faUser, faComment, faClock } from '@fortawesome/free-regular-svg-icons';
// import { faReply } from '@fortawesome/free-solid-svg-icons';

// import CNavSide from '@/components/layout/CNavSide.vue';
import CommonLayout from '@/components/layout/CommonLayout.vue';

import CBubble from '@/components/common/CBubble.vue';
import CDate from '@/components/common/CDate.vue';
import CInfoCard from '@/components/common/CInfoCard.vue';

import CUsername from '@/components/user/CUsername.vue';

import UserLogin from '../../components/user/UserLogin.vue';

import TextRender from '@/components/text/TextRender.vue';
import TextEditor from '@/components/text/TextEditor.vue';

import { ElContainer, ElMain, ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { ElCard, ElButton, ElPagination, ElAffix, ElDivider } from 'element-plus';

import { inject, onMounted, ref, watch } from 'vue';

import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';

import { useTestdata } from '@/stores/test';
import { useUtil } from '@/stores/util';

import type { BgPost, BgReply, ErrorResponse, Reply } from '@/interface';
import axios, { AxiosError, type AxiosResponse } from 'axios';

// =====  Auth Area =====

const auth = useAuth();
const util = useUtil();

const router = useRouter();

const showLogin = ref(false);

// ===== Reply Area =====

const reply = ref<HTMLElement>(null!);
const replyContent = ref('');

function scrollToReply() {
    reply.value.scrollIntoView();
}

// ===== Test Area ======

const testData = useTestdata();

const currentData = ref({
    post: util.fakePost,
    replys: [] as Reply[],
    total: 100
});

const page = ref(util.parseQueryInt('page') || 1);

interface PostResponse {
    post: BgPost,
    replyCOunt: number,
    replies: BgReply[]
}

async function queryPostDetail(){

    let pid = util.parseParamInt('pid');

    if(pid === undefined){
        currentData.value = {
            post: util.nonePost, replys: [] as Reply[], total: 0
        }
        return;
    }

    await axios<PostResponse>({
        url: `http://43.143.171.43:9999/api/post/${pid}`,
        method: 'POST',
        data: {
            page: page.value
        },
        withCredentials: true
    })
    .then((e: AxiosResponse<PostResponse>) => {
        console.log(e.data);
        
        currentData.value.post = util.conveyPost(e.data.post);
        currentData.value.replys = [];
        currentData.value.total = e.data.replies.length;

        e.data.replies.forEach((bgReply) => { currentData.value.replys.push(util.conveyReply(bgReply))});
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
                title: '帖子内容获取失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });
        }
        
        currentData.value = {
            post: util.nonePost, replys: [] as Reply[], total: 0
        }
    });
}

async function doPostDelete(){
    axios<PostResponse>({
        url: 'http://43.143.171.43:9999/api/post/delete',
        method: 'POST',
        data: {
            pid: currentData.value.post.id,
            token: auth.getToken()
        },
        withCredentials: true
    }).then((e: AxiosResponse<PostResponse>) => {
        ElMessage({
            type: 'success',
            message: '删除成功',
        });
        router.push('/post');

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

function doReply(){
    axios<PostResponse>({
        url: 'http://43.143.171.43:9999/api/reply/create',
        method: 'POST',
        data: {
            pid: currentData.value.post.id,
            content: replyContent.value,
            token: auth.getToken()
        },
        withCredentials: true
    }).then((e: AxiosResponse<PostResponse>) => {
        ElMessage({
            type: 'success',
            message: '回复成功',
        });

        replyContent.value = '';

        queryPostDetail();

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
                title: '回复失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });
            if(e.response?.status === 401){
                router.push({ name: 'login' });
            }
        }
    });
}

function confirmDelete(){
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

onMounted(() => {
    queryPostDetail();
});

watch(page, () => {
    queryPostDetail();
});

</script>

<style scoped lang="scss">
.main-container {
    justify-content: center;
}

.main {
    max-width: 800px;
    min-height: 100vh;

    justify-content: center;
}


.aside {

    min-width: 300px;

    margin-left: 1em;
    padding: 1.5em 1em;

    box-sizing: border-box;

    background-color: white;
}

.reply-buttons {
    display: flex;
    justify-content: end;
    margin-top: 0.5em;
}

.pagination {
    margin: 1em 0.5em;

    justify-content: flex-end;
}

.info {

    >.info-item {
        display: flex;
        justify-content: space-between;
    }

    > :not(:last-child) {
        margin-bottom: 0.5em;
    }
}

.reply-operator {
    float: right;

    cursor: pointer;

    > :not(:last-child) {
        margin-right: 1em;
    }
}

.post-operator {
    display: flex;

    justify-content: space-between;
    margin-top: 1em;
}

.login-area {
    cursor: pointer;

    background-color: var(--el-color-info-light-9);
    border: 1px solid var(--el-color-info);

    height: 10em;

    border-radius: 4px;

    margin-top: 0.5em;

    display: flex;
    align-items: center;
    justify-content: center;

    >.please-login {
        user-select: none;

        font-size: x-large;
        font-weight: lighter;
    }
}
</style>