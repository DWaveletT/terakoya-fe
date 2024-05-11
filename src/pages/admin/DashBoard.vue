<template>
    <common-layout :admin="true" :bread="[{label: '寺子屋', name: 'home'}, {label: '管理后台'}]" title="管理后台">
        <el-row style="flex: 1">
            <el-col :span="5" class="aside">
                <el-affix target=".aside">
                    <el-menu
                        default-active="2"
                        @select="(index) => { manageIndex = index }"
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
                </el-affix>
            </el-col>
            <el-col :span="18">
                <el-card class="pane" shadow="never">
                    <component v-if="manageIndex === '0'" :is="ManageHome" />
                    <component v-else-if="manageIndex === '1'" :is="ManageUser" />
                    <component v-else-if="manageIndex === '2'" :is="ManagePost" />
                    <component v-else-if="manageIndex === '3'" :is="ManageReply" />
                    <component v-else-if="manageIndex === '4'" :is="ManageBoard" />
                </el-card>
            </el-col>
        </el-row>
    </common-layout>
</template>

<script setup lang="ts">

import CommonLayout from '@/components/layout/CommonLayout.vue';

import ManageHome from './ManageHome.vue';
import ManageUser from './ManageUser.vue';
import ManagePost from './ManagePost.vue';
import ManageReply from './ManageReply.vue';
import ManageBoard from './ManageBoard.vue';

import { ElMenu, ElMenuItem, ElRow, ElCol, ElCard, ElAffix, ElDivider } from 'element-plus';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faComment, faPaperPlane, faFolder, faList, faGears } from '@fortawesome/free-solid-svg-icons';

import { ref } from 'vue';

const manageIndex = ref("0");

</script>

<style scoped lang="scss">
.pane {
    margin: 1em 3em;
}

.aside {
    background-color: white;

    border-right: 1px solid var(--el-border-color);
}
</style>
