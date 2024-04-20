<template>
    <common-layout
        :title="currentData.post.title"
        :bread="['首页', '讨论详情']"
    >
        <el-container class="main-container">
            <el-main class="main">
                <c-bubble :user="currentData.post.poster" border-color="var(--el-color-warning)">
                    <template #header>
                        <c-username :user="currentData.post.poster" /> / {{ currentData.post.time }}
                        <div class="reply-operator">
                            楼主
                        </div>
                    </template>
                    <template #message>
                        <text-render :content="currentData.post.content" />
                    </template>
                </c-bubble>

                <el-pagination v-if="currentData.replys.length > 5" :page-size="20" :pager-count="7" layout="prev, pager, next" :total="currentData.total" background
                    hide-on-single-page small class="pagination" v-model:current-page="page" />

                <c-bubble v-for="i in currentData.replys" :key="i.id" :user="i.replyer">
                    <template #header>
                        <c-username :user="i.replyer" /> / {{ i.time }}
                        <div class="reply-operator">
                            <span @click="doReplyLike(i.id)">
                                <font-awesome-icon :icon="faThumbsUp" /> {{ i.like }}
                            </span>
                            <span @click="doReplyDislike(i.id)">
                                <font-awesome-icon :icon="faThumbsDown" /> {{ i.dislike }}
                            </span>
                        </div>
                    </template>
                    <template #message>
                        <text-render :content="i.content" />
                    </template>
                </c-bubble>

                <el-pagination hideOnSinglePage :page-size="20" :pager-count="7" layout="prev, pager, next" :total="currentData.total" background small class="pagination" v-model:current-page="page" />

                <div ref="reply" />

                <el-card shadow="hover">
                    <h3 style="margin: 0;">回复帖子</h3>

                    <template v-if="auth.isLoggedIn">
                        <text-editor v-model="replyContent" placeholder="请在此处回复，支持使用 Markdown。" />
                    </template>
                    <template v-else>
                        <div class="login-area" @click="showLogin = true">
                            <span class="please-login">请先登录</span>
                        </div>
                    </template>

                    <div class="reply-buttons">
                        <el-button type="danger" plain>清除</el-button>
                        <el-button type="primary">回复</el-button>
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
                                <div>{{ currentData.post.time }}</div>
                            </div>
                            <div class="info-item">
                                <div><font-awesome-icon :icon="faComment" /> 回复个数</div>
                                <div>{{ currentData.total }}</div>
                            </div>
                            <div class="info-item">
                                <div><font-awesome-icon :icon="faThumbsUp" /> 点赞量</div>
                                <div>{{ currentData.post.like }}</div>
                            </div>
                            <div class="info-item">
                                <div><font-awesome-icon :icon="faThumbsDown" /> 点踩量</div>
                                <div>{{ currentData.post.dislike }}</div>
                            </div>
                        </div>
                    </c-info-card>

                    <div class="post-operator">
                        <div>
                            <el-button type="success" plain circle @click="doPostLike"><font-awesome-icon :icon="faThumbsUp" /></el-button>
                            <el-button type="danger" plain circle @click="doPostDislike"><font-awesome-icon :icon="faThumbsDown" /></el-button>
                        </div>
                        <div>
                            <el-button type="primary" plain @click="scrollToReply">回复</el-button>
                            <el-button type="danger" plain @click="doPostDelete">删除</el-button>
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
import CInfoCard from '@/components/common/CInfoCard.vue';

import CUsername from '@/components/user/CUsername.vue';

import UserLogin from '../../components/user/UserLogin.vue';

import TextRender from '@/components/text/TextRender.vue';
import TextEditor from '@/components/text/TextEditor.vue';

import { ElContainer, ElMain } from 'element-plus';
import { ElCard, ElButton, ElPagination, ElAffix, ElDivider } from 'element-plus';

import { inject, onMounted, ref } from 'vue';

import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';

import { useTestdata } from '@/stores/test';
import { useUtil } from '@/stores/util';

import type { Reply } from '@/interface';

// =====  Auth Area =====

const auth = useAuth();
const router = useRouter();

const util = useUtil();

const showLogin = ref(false);

// ===== Reply Area =====

const reply = ref<HTMLElement>(null!);
const replyContent = ref('');

const scrollbarWrap = inject<HTMLDivElement | null>('scrollbar-wrap');
function scrollToReply() {
    scrollbarWrap?.scrollTo({ top: reply.value.offsetTop - 10, behavior: 'smooth' });
}

// ===== Test Area ======

const testData = useTestdata();

const currentData = ref({
    post: util.fakePost,
    replys: [] as Reply[],
    total: 100
});

const page = ref(util.parseQueryInt('page') || 1);

function queryPostDetail(){

    console.log('query post detail');

    let pid = util.parseParamInt('pid');

    if(pid === undefined){
        currentData.value = {
            post: util.nonePost, replys: [] as Reply[], total: 0
        }
        return;
    }

    let testpost = testData.testPost.find((post) => post.id === pid);

    console.log(testpost);

    if(testpost === undefined){
        currentData.value = {
            post: util.nonePost, replys: [] as Reply[], total: 0
        }
        return;
    }

    currentData.value = {
        post: testpost,
        replys: testData.testReply.filter((i) => i.post === testpost.id),
        total: 100
    }
}

function doPostDelete() {
    console.log('do post delete');
    
}

function doPostLike() {
    console.log('do post like');
}

function doPostDislike() {
    console.log('do post dislike');

}

function doReplyLike(rid: number) {
    console.log('do reply like', rid);

}

function doReplyDislike(rid: number) {
    console.log('do reply dislike', rid);
}

onMounted(() => {
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

// .nav-aside {
//     max-width: 50px;
// }

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