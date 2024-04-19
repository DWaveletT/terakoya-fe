<template>
    <common-layout :bread="['寺子屋', '帖子列表']" title="发布帖子">
        <div class="main-container">
            <el-row :gutter="20">
                <el-col :span="6">
                    <block-sidebar v-model="boardId" />
                </el-col>
                <el-col :span="18">
                    <el-card>
                        <el-form :model="post" label-width="auto">
                            <el-form-item label="帖子标题">
                                <el-input type="text" v-model="post.title" placeholder="长度应介于 1 至 10 之间" />
                            </el-form-item>
                            <el-form-item label="帖子内容">
                                <text-editor v-model="post.content" style="flex-grow: 1" />
                            </el-form-item>
                        </el-form>

                        <div class="submit">
                            <span>将会发布在 <el-text type="primary" size="large">{{ info.boards.find((board) => { return board.id === boardId })?.name }}</el-text> 版块</span>
                            <el-button type="primary">发布</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </common-layout>
</template>

<script setup lang="ts">
import CommonLayout from '@/components/layout/CommonLayout.vue';
import BlockSidebar from '@/components/post/BlockSidebar.vue';

import TextEditor from '@/components/text/TextEditor.vue';

import { ElRow, ElCol, ElCard, ElButton, ElForm, ElFormItem, ElInput, ElText } from 'element-plus';

import { ref } from 'vue';
import type { Post } from '@/interface';

import { useInfo } from '@/stores/info';
import { useRoute } from 'vue-router';
import { isArray } from 'element-plus/es/utils/types.mjs';

const info = useInfo();
const route = useRoute();

function getBoardId(){
    let result = route.query['boardId'];

    if(isArray(result)){
        return parseInt(result[0] || '1');
    } else {
        return parseInt(result    || '1');
    }
}

const boardId = ref(getBoardId());

const post = ref<Post>({
    id: null!,
    board: null!,
    like: null!,
    dislike: null!,
    title: '',
    content: '',
    poster: null!,
    time: null!,
});

</script>

<style scoped lang="scss">

.main-container {
    flex-grow: 1;
    max-width: 1080px;

    margin: 1em auto;
}

.pagination {
    justify-content: right;
}

.submit {
    display: flex;
    justify-content: space-between;
}
</style>
