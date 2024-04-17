<template>
    <common-layout>
        <el-container class="main-container">
            <el-main class="main">
                <c-bubble :user="testUser" border-color="var(--el-color-warning)">
                    <template #header>
                        <c-username :user=testUser /> / 1970-01-01
                        <div class="reply-operator">
                            楼主
                        </div>
                    </template>
                    <template #message>
                        <text-render :content="text1" />
                    </template>
                </c-bubble>

                <el-pagination :page-size="20" :pager-count="7" layout="prev, pager, next" :total="1000" background
                    hide-on-single-page small class="pagination" />

                <c-bubble :user="testUser" v-for="i in tmp" :key="i">
                    <template #header>
                        <c-username :user=testUser />
                        <div class="reply-operator">
                            <span>
                                <font-awesome-icon :icon="faThumbsUp" /> 114
                            </span>
                            <span>
                                <font-awesome-icon :icon="faThumbsDown" /> 514
                            </span>
                        </div>
                    </template>
                    <template #message>
                        <text-render :content="text2" />
                    </template>
                </c-bubble>

                <el-pagination :page-size="20" :pager-count="7" layout="prev, pager, next" :total="1000" background
                    hide-on-single-page small class="pagination" />

                <div ref="reply" />

                <el-card shadow="hover">
                    <h3 style="margin: 0;">回复帖子</h3>

                    <template v-if="isLoggedIn">
                        <text-editor v-model="replyContent" />
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

                        <h3 style="margin: 0.5em; text-align: center;">我是帖子标题</h3>

                        <el-divider />

                        <div class="info">
                            <div class="info-item">
                                <div><font-awesome-icon :icon="faUser" /> 楼主</div>
                                <div>泡椛儿碱</div>
                            </div>
                            <div class="info-item">
                                <div><font-awesome-icon :icon="faClock" /> 发布日期</div>
                                <div>04-17-14:00</div>
                            </div>
                            <div class="info-item">
                                <div><font-awesome-icon :icon="faComment" /> 回帖数量</div>
                                <div>114514</div>
                            </div>
                            <div class="info-item">
                                <div><font-awesome-icon :icon="faThumbsUp" /> 点赞数量</div>
                                <div>514</div>
                            </div>
                            <div class="info-item">
                                <div><font-awesome-icon :icon="faThumbsDown" /> 点踩数量</div>
                                <div>114</div>
                            </div>
                        </div>
                    </c-info-card>

                    <div class="post-operator">
                        <div>
                            <el-button type="success" plain circle><font-awesome-icon :icon="faThumbsUp" /></el-button>
                            <el-button type="danger" plain circle><font-awesome-icon :icon="faThumbsDown" /></el-button>
                        </div>
                        <div>
                            <el-button type="primary" plain @click="scrollToReply">回复</el-button>
                            <el-button type="danger" plain>删除</el-button>
                        </div>
                    </div>
                </el-affix>
            </aside>
        </el-container>
    </common-layout>

    <user-login v-model="showLogin" />

    <el-backtop :right="50" :bottom="50" />
    <!-- <c-nav-side /> -->
</template>

<script setup lang="ts">
import type { User } from '@/interface';

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
import { ElCard, ElButton, ElPagination, ElAffix, ElDivider, ElBacktop } from 'element-plus';

import { ref } from 'vue';

const testUser = ref<User>({
    id: 1,
    name: '椛儿',
    role: 1
});

const tmp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const reply = ref<HTMLElement>(null!);
const replyContent = ref('');

const showLogin = ref(false);

const text1 = `
# 大家好啊

我是说的道理，今天来点大家想看的东西。

## 列表语法

- 我是一个无序列表。
- 这个是第二个条目。
- 这个是第三个条目。

## 其他语法

这个词会被**加粗**。
`;

const text2 = `这个是占位置用的文本。`;

const isLoggedIn = ref(false);

function scrollToReply() {
    reply.value.scrollIntoView({ behavior: 'smooth' });
}

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