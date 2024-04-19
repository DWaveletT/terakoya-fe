<template>
    <common-layout :bread="['level1', 'level2', 'level3']" title="帖子列表">
        <div class="main-container">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-affix target=".main-container" :offset="20">
                        <el-card>
                            <h3 class="title">版块选择</h3>
                            <div class="boards">
                                <el-scrollbar height="250px">
                                    <div v-for="board in boards" :key="board.id" class="board-item" :class="{ selected: currentBoardId === board.id }" @click="selectBoard(board)">
                                        {{ board.name }}
                                    </div>
                                </el-scrollbar>
                            </div>
                        </el-card>
                        <el-card style="margin-top: 0.5em">
                            <h3 class="title">版块说明</h3>
                            <template v-if="currentBoardId === 0">
                                <p>请在上方版块列表里选择一个版块。</p>
                            </template>
                            <template v-else>
                                <p>{{ currentBoardInfo }}</p>
                            </template>
                        </el-card>
                    </el-affix>
                </el-col>
                <el-col :span="18">
                    <el-pagination :page-size="20" :pager-count="7" layout="prev, pager, next" :total="currentData.total" background
                        hide-on-single-page small class="pagination" />
                    <div class="cards">
                        <el-card v-for="post in currentData.posts" :key="post.id" class="post-item">
                            <el-row style="height: 60px;">
                                <el-col :span="3" class="card-item vertical-middle">
                                    <c-avatar :user="post.poster" :size="60" />
                                </el-col>
                                <el-col :span="7" class="card-item">
                                    <h3 class="title" style="margin-top: 0">{{ post.title }}</h3>
                                    <c-username :user="post.poster" />
                                    <span style="color: var(--el-color-info)"> 发表于 {{ post.time }}</span>
                                </el-col>
                                <el-col :span="12" class="card-item describe">
                                    {{ post.content }}
                                </el-col>
                                <el-col :span="2" class="card-item vertical-middle">
                                    <div>
                                        <div class="info-item">
                                            <font-awesome-icon :icon="faThumbsUp" /> {{ post.like > 999 ? '999+' : post.like }}
                                        </div>
                                        <div class="info-item">
                                            <font-awesome-icon :icon="faThumbsDown" /> {{ post.dislike > 999 ? '999+' : post.dislike }}
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>
                    <el-pagination :page-size="20" :pager-count="7" layout="prev, pager, next" :total="currentData.total" background
                    hide-on-single-page small class="pagination" />
                </el-col>
            </el-row>
        </div>

        <el-backtop :right="50" :bottom="50" />

        <div class="new-post">
            <el-button circle size="large" style="border: 2px solid var(--el-color-primary);">
                <font-awesome-icon :icon="faPaperPlane" size="lg" />
            </el-button>
        </div>
    </common-layout>
</template>

<script setup lang="ts">
import { type Board } from '@/interface';

import CommonLayout from '@/components/layout/CommonLayout.vue';

import CAvatar from '@/components/common/CAvatar.vue';
import CUsername from '@/components/user/CUsername.vue';

import { ElRow, ElCol, ElCard, ElScrollbar, ElPagination, ElAffix, ElBacktop, ElButton } from 'element-plus';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

import { ref } from 'vue';

import { useTestdata } from '@/stores/test';

const testdata = useTestdata();
const boards = [...testdata.testBoard, ...testdata.testBoard, ...testdata.testBoard];

const currentBoardId   = ref(0);
const currentBoardInfo = ref('');

function selectBoard(board: Board) {
    currentBoardId.value   = board.id;
    currentBoardInfo.value = board.description;
}

const currentData = {
    total: 100,
    posts: [...testdata.testPost, ...testdata.testPost, ...testdata.testPost, ...testdata.testPost, ...testdata.testPost]
};

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

.board-item {
    padding: 0.5em 1em;
    margin: 0 0;

    color: var(--el-color-primary-dark-2);
    background-color: var(--el-color-primary-light-8);

    transition: background-color 0.2s ease-in-out;

    &.selected {
        color: white;
        background-color: var(--el-color-primary);
    }

    &:not(:last-child){
        border-bottom: 2px solid var(--el-color-primary);
    }
}

.post-item {
    &:not(:last-child) {
        margin-bottom: 0.5em;
    }
}

.card-item {
    overflow: hidden;
    white-space: nowrap;
}

.info-item {
    &:not(:last-child) {
        margin-bottom: 0.5em;
    }
}

.boards {
    max-height: 250px;

    border-top: 3px solid var(--el-color-primary);
    border-bottom: 3px solid var(--el-color-primary);

    background-color: var(--el-color-primary-light-7);

    cursor: pointer;
}

.describe {
    max-height: 60px;
    overflow: hidden;
    padding: 0 0.5em;
    white-space: wrap;
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
</style>
