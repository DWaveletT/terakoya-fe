<template>
    <div class="main-header">
        <img class="banner" src="../../assets/banner.png">
        <div class="title-container">
            <h1 class="title">寺子屋 ~ terakoya</h1>
        </div>
    </div>

    <div class="nav-container" >
        <div class="nav">
            <div class="item">
                <router-link class="nav-item" :to=" {name: 'post.list'} ">
                    帖子列表
                </router-link>
            </div>
            <div class="item">
                <router-link class="nav-item" :to=" {name: 'user.home'} ">
                    用户中心
                </router-link>
            </div>
            <div class="item">
                <router-link class="nav-item" :to=" {name: 'admin'} ">
                    管理后台
                </router-link>
            </div>
        </div>

        <div class="github-container">
            <a href="https://github.com/DWaveletT/terakoya-fe">
                <svg class="github" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                <!-- !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" fill="currentColor"/>
                </svg>
            </a>
        </div>
    </div>

    <div class="main-container">

        <div class="main">
            <div class="block-card">
                <h2 class="subtitle">最新帖子<div class="decoration" /></h2>

                <div class="latest">
                    <div class="card-container" v-for="post in latestPosts" :key="post.id">
                        <el-card class="latest-card" shadow="hover">
                            <div class="info" >
                                <div class="title">
                                    <div class="head-container" @click="jumpPostDetail(post.id)">
                                        <h2 class="head" style="cursor: pointer;">{{ post.title }}</h2>
                                        <div class="decoration" />
                                    </div>
                                    
                                </div>
                                <div class="data">
                                    <div class="chart">
                                        <font-awesome-icon :icon="faUser" />
                                        {{ post.poster.name }}
                                    </div>

                                    <div class="time">
                                        <c-date :date="new Date(post.time)" placement="bottom" />
                                    </div>
                                </div>
                            </div>

                            <div class="tail">
                                <c-avatar :user="post.poster" />
                            </div>
                            
                            <div class="goto-block" @click="jumpPostDetail(post.id)">
                                <font-awesome-icon :icon="faAngleRight" size="2x" />
                            </div>
                        </el-card>
                    </div>
                </div>

            </div>

            <div class="block-card">
                <h2 class="subtitle">最新回复<div class="decoration" /></h2>

                <div class="latest">
                    <div class="card-container" v-for="reply in latestReplies" :key="reply.id">
                        <el-card class="latest-card" shadow="hover">
                            <div class="info" >
                                <div class="content">
                                    <div class="head-container" @click="jumpPostDetail(reply.post)">
                                        <div class="head" style="cursor: pointer;">{{ reply.content }}</div>
                                    </div>
                                </div>
                                <div class="data">
                                    <div class="chart">
                                        <font-awesome-icon :icon="faUser" />
                                        {{ reply.replyer.name }}
                                    </div>

                                    <div class="time">
                                        <c-date :date="new Date(reply.time)" placement="bottom" />
                                    </div>
                                </div>
                            </div>

                            <div class="tail">
                                <c-avatar :user="reply.replyer" />
                            </div>
                            
                        </el-card>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <footer class="main-footer">
            <p>由 HIT Touhou Team 基于 Element Plus 编写。保留所有权利。</p>
            <p>2024 年 4 月 15 日。</p>
    </footer>
</template>

<script setup lang="ts">
import type { BgPost, BgReply, Board, ErrorResponse, Post, Reply } from '@/interface';
import CDate from '@/components/common/CDate.vue';
import CAvatar from '@/components/common/CAvatar.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { ElCard, ElAffix } from 'element-plus';

import axios, { AxiosError, type AxiosResponse } from 'axios';

import { onMounted, ref } from 'vue';

import { useTestdata } from '@/stores/test';
import { useAuth } from '@/stores/auth';
import { useUtil } from '@/stores/util';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';

const auth = useAuth();
const util = useUtil();

const router = useRouter();

const testdata = useTestdata();

const latestPosts = ref<Post []>([]);
const latestReplies = ref<Reply[]>([]);

type  PostListResponse =  BgPost[];

interface ReplyListResponse {
    replies: BgReply[],
}

function jumpPostDetail(pid: number){
    router.push({ name: 'post.detail', params: { pid }});
}

async function queryPostList(){
    await axios<PostListResponse>({
        url: 'http://43.143.171.43:9999/api/post/latest',
        method: 'POST',
        data: {
            page: 1,
            token: auth.getToken()
        },
        withCredentials: true
    })
    .then((e: AxiosResponse<PostListResponse>) => {
        latestPosts.value = [];

        e.data.forEach((bgPost) => { latestPosts.value.push(util.conveyPost(bgPost)); });
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
                title: '最新帖子获取失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });
        }
    });
}

async function queryReplyList(){
    await axios<ReplyListResponse>({
        url: 'http://43.143.171.43:9999/api/reply/latest',
        method: 'POST',
        data: {
            page: 1,
            token: auth.getToken()
        },
        withCredentials: true
    })
    .then((e: AxiosResponse<ReplyListResponse>) => {
        latestReplies.value = [];

        e.data.replies.forEach((bgReply) => { latestReplies.value.push(util.conveyReply(bgReply)); });
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
                title: '最新回复获取失败',
                message: (response.data as ErrorResponse).message,
                type: 'error',
            });
        }
    });
}

onMounted(() => {
    queryReplyList(), queryPostList();
})

</script>

<style scoped lang="scss">


.main-header {
    z-index: 1;
    position: relative;
    > .banner {
        width: 100%;
        margin-bottom: -50px;
    }

    > .title-container {
        position: absolute;
        top: 4em;
        width: 100%;

        @keyframes slideIn {
            from {
                transform: translateY(-2em);
            }
            to {
                transform: none;
            }
        }

        > .title {
            text-align: center;
            font-weight: bold;

            animation: 1s slideIn;

            text-shadow: 4px 4px 2px white;

            font-size: 300%;
        }
    }
}

.nav-container {
    box-sizing: border-box;
    position: sticky;
    top: 0;
    left: 0;

    z-index: 3;

    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 48px;

    backdrop-filter: blur(2px);

    padding: 0 5em;

    &.hidden {
        visibility: hidden;
    }
}

.nav {

    display: flex;
    border-bottom: 1px solid black;

    > .item {
        width: 100px;

        position: relative;

        .nav-item {
            margin: 0;
        }

        .nav-item {
            height: 48px;

            color: black;

            text-decoration: none;

            font-weight: bold;

            display: flex;
            align-items: center;
            justify-content: center;

            transition: 0.2s ease-in-out opacity;
            opacity: 0.6;
        }

        &:hover {
            .nav-item {
                opacity: 1;
            }

            .sub-item {
                pointer-events: all;
                opacity: 1;
            }
        }
    }
}

.github-container {
    display: flex;
    height: 100%;

    align-items: center;
}

.github {
    width: 24px;
    height: 24px;

    opacity: 0.6;

    color: black;

    transition: 0.2s ease-in-out opacity;

    &:hover {
        opacity: 1.0;
    }
}

.main-container {
    display: flex;
    justify-content: center;
}

.main {
    z-index: 2;
    width: min(90%, 1080px);
    min-height: 100vh;

    justify-content: center;

    margin: 1em auto;

    fill-opacity: 0.5;
}

.block-card {
    background-color: rgb(from white r g b / 0.5);
    padding: 1em 0.5em;

    &:not(:last-child){
        margin-bottom: 2em;
    }
    
}

.subtitle {
    text-align: center;
    position: relative;

    color: var(--el-color-info);

    margin-bottom: 1.5em;

    > .decoration {
        height: 2px;
        width: 0;

        position: relative;
        bottom: -0.5em;
        left: calc(50% - 5em);

        background-color: var(--el-color-info);
        
        transition: 0.2s ease-in-out width;
    }

    &:hover {
        > .decoration {
            width: 10em;
        }
    }
}

.latest {
    display: flex;
    flex-wrap: wrap;

    justify-content: space-between;
}

.info {
    .title {
        height: 4em;

        margin-top: -0.5em;
        margin-right: 1em;

        > .head-container {
            display: inline-block;
            transition: 0.2s ease-in-out color;

            width: 100%;

            > .head {
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;

                margin: 0.5em 0;

                text-wrap: nowrap;

            }

            > .decoration {
                position: absolute;
                bottom: 0;
                width: 0;
                height: 2px;

                background-color: var(--el-color-primary-dark-2);

                transition: 0.5s ease-in-out width;
            }

            &:hover {
                color: var(--el-color-primary-dark-2);

                > .decoration {
                    width: 100%;
                }
            }
        }
    }

    .content {
        margin: -1em 0 0.5em 0;

        > .head-container {
            display: inline-block;
            transition: 0.2s ease-in-out color;

            width: 100%;

            > .head {
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;

                margin: 0.5em 0;

                text-wrap: nowrap;
            }
        }
    }

    .data {
        position: absolute;

        bottom: 0;
        left: 0;

        font-size: small;
        font-weight: lighter;

        color: var(--el-color-primary-dark-2);

        display: flex;

        & .chart {
            padding: 0.3em 1em 0.3em 1em;
            background-color: var(--el-color-primary-light-5);
            border-top-right-radius: 10px;
        }

        & .time {
            padding: 0.3em 1em 0.3em 1em;
        }
    }
}

.latest-card {
    fill-opacity: 0.7;
    color: var(--el-color-info);

    position: relative;

    border: 2px solid var(--el-color-primary-light-3);
    border-top-left-radius:  20px;

    .tail {
        position: absolute;
        right: 4em;
        top: calc(50% - 24px);
    }

    .goto-block {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 2em;

        color: var(--el-color-primary-light-3);
        background: var(--el-color-primary);

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;

        transition: color 0.2s ease-in-out;

        &:hover {
            color: var(--el-color-primary-dark-2);
        }
    }
}

.card-container {
    width: 48%;

    &:not(:last-child){
        margin-bottom: 1em;
    }

    &:hover {
        .latest-card {
            transform: translateX(10px);
        }
    }
}

.main-footer {
    display: block;
    text-align: center;

    border-top: 4px solid var(--el-color-primary);
    background-color: var(--el-color-primary-light-7);

    padding: 1em 0;
}
</style>