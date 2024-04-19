<template>
    <common-layout :bread="['寺子屋', '帖子列表']" title="帖子列表">
        <div class="main-container">
            <el-row :gutter="20">
                <el-col :span="6">
                    <block-sidebar :all="true" v-model="boardId" />
                </el-col>
                <el-col :span="18">
                    <el-pagination :page-size="20" :pager-count="7" layout="prev, pager, next" :total="currentData.total" background
                        hide-on-single-page small class="pagination" v-model:current-page="page" />
                    <div class="cards">
                        <el-card v-for="post in currentData.posts" :key="post.id" class="post-item" @click="jumpPostDetail(post.id)">
                            <el-row style="height: 60px;">
                                <el-col :span="3" class="card-item vertical-middle">
                                    <c-avatar :user="post.poster" :size="60" />
                                </el-col>
                                <el-col :span="7" class="card-item">
                                    <h3 class="title" style="margin-top: 0">{{ post.title }}</h3>
                                    <span style="font-size: small"><c-username :user="post.poster" /> <span style="color: var(--el-color-info); ">发表于 {{ post.time }}</span></span>
                                </el-col>
                                <el-col :span="12" class="card-item describe">
                                    {{ post.content }}
                                </el-col>
                                <el-col :span="2" class="card-item vertical-middle">
                                    <div>
                                        <el-tag type="success" class="info-item"><font-awesome-icon :icon="faThumbsUp" /> {{ post.like > 999 ? '999+' : post.like }}</el-tag>
                                        <el-tag type="danger" class="info-item"><font-awesome-icon :icon="faThumbsDown" /> {{ post.dislike > 999 ? '999+' : post.dislike }}</el-tag>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>
                    <el-pagination :page-size="20" :pager-count="7" layout="prev, pager, next" :total="currentData.total" background
                    hide-on-single-page small class="pagination" v-model:current-page="page" />
                </el-col>
            </el-row>
        </div>

        <div class="new-post">
            <el-button circle size="large" style="border: 2px solid var(--el-color-primary);" @click="jumpPostNew">
                <font-awesome-icon :icon="faPaperPlane" size="lg" />
            </el-button>
        </div>
    </common-layout>
</template>

<script setup lang="ts">
import CommonLayout from '@/components/layout/CommonLayout.vue';

import CAvatar from '@/components/common/CAvatar.vue';
import CUsername from '@/components/user/CUsername.vue';

import BlockSidebar from '@/components/post/BlockSidebar.vue';

import { ElRow, ElCol, ElCard, ElPagination, ElButton, ElTag } from 'element-plus';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

import { onMounted, ref, watch } from 'vue';

import { useTestdata } from '@/stores/test';
import { useRouter } from 'vue-router';

import { type Post } from '@/interface';

const boardId = ref(0);

const testdata = useTestdata();
const router = useRouter();

const page = ref(1);

const currentData = ref({
    total: 0,
    posts: [] as Post[]
});

function jumpPostDetail(pid: number){
    router.push({ name: 'post.detail', params: { pid }});
}

function jumpPostNew() {
    if(boardId.value > 0){
        router.push({ name: 'post.new', query: { 'boardId': boardId.value }});
    } else {
        router.push({ name: 'post.new' });
    }
}

function queryPostList(){
    console.log('query', page.value);

    currentData.value = {
        total: 100,
        posts: [...testdata.testPost, ...testdata.testPost, ...testdata.testPost, ...testdata.testPost, ...testdata.testPost]
    };
}

onMounted(() => {
    queryPostList();
});

watch([page, boardId], () => {
    queryPostList();
});

</script>

<style scoped lang="scss">

.vertical-middle {
    display: flex;
    align-items: center;
}

.main-container {
    flex-grow: 1;
    max-width: 1080px;

    margin: 1em auto;
}

.post-item {
    cursor: pointer;

    &:not(:last-child) {
        margin-bottom: 0.5em;
    }
}

.card-item {
    overflow: hidden;
    white-space: nowrap;
}

.info-item {
    display: flex;

    width: 5em;

    justify-content: left;

    &:not(:last-child) {
        margin-bottom: 0.5em;
    }
}

.cards {
    margin: 1em 0;
}

.pagination {
    justify-content: right;
}

.new-post {
    position: fixed;

    right: 40px;
    bottom: 100px;
}

.describe {
    max-height: 60px;
    padding: 0 0.5em;
    white-space: wrap;
    
    text-overflow: ellipsis;
}
</style>
