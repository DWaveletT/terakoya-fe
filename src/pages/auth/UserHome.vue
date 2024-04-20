<template>
    <common-layout>
            <el-card class="main-container">
                <el-tabs v-model="curTab">
                    <el-tab-pane label="个性" name="avatar">
                        <user-custom />
                    </el-tab-pane>
                    <el-tab-pane label="帖子" name="post">
                        <user-postlist/>
                    </el-tab-pane>
                    <el-tab-pane label="安全" name="account">
                        <user-safety />
                    </el-tab-pane>
                </el-tabs>
            </el-card>
    </common-layout>
</template>

<script setup lang="ts">

import CommonLayout from '@/components/layout/CommonLayout.vue';

import UserCustom from './UserCustom.vue';
import UserSafety from './UserSafety.vue';
import UserPostlist from './UserPostlist.vue';

import { ElTabs, ElTabPane, ElCard } from 'element-plus';

import { ref } from 'vue';

const curTab = ref('avatar');

</script>

<style scoped lang="scss">
.main-container {
    max-width: 1080px;

    margin: 1em auto;
    flex: 1;
}

</style>
