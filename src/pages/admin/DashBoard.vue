<template>
    <common-layout :admin="true" :bread="['level1', 'level2', 'level3']" title="管理后台">
        <el-row style="flex: 1">
            <el-col :span="5" style="min-height: 100%">
                <el-menu
                    default-active="2"
                    style="min-height: 100%"
                >
                    <el-menu-item index="0">
                        <font-awesome-icon :icon="faList" style="margin: 0 1em;" />
                        <span>首页</span>
                    </el-menu-item>
                    <el-menu-item index="1">
                        <font-awesome-icon :icon="faUser" style="margin: 0 1em;" />
                        <span>用户</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <font-awesome-icon :icon="faPaperPlane" style="margin: 0 1em;" />
                        <span>帖子</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <font-awesome-icon :icon="faComment" style="margin: 0 1em;" />
                        <span>回复</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <font-awesome-icon :icon="faFolder" style="margin: 0 1em;" />
                        <span>版块</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="16">
                <el-card class="pane" shadow="never">
                    <p v-for="i in [1, 2, 3, 4, 5]" :key="i">something...</p>
                </el-card>
            </el-col>
        </el-row>
    </common-layout>
</template>

<script setup lang="ts">

import CommonLayout from '@/components/layout/CommonLayout.vue';

import { ElMenu, ElSubMenu, ElMenuItem, ElMenuItemGroup, ElRow, ElCol, ElCard } from 'element-plus';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faComment, faPaperPlane, faFolder, faList } from '@fortawesome/free-solid-svg-icons';

import { ref } from 'vue';

</script>

<style scoped lang="scss">
.pane {
    margin: 1em 3em;
}
</style>
