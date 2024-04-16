<template>
    <el-container class="full-container">
        <el-header class="wrapped" style="height: auto; padding: 0;">
            <c-header />
        </el-header>

        <el-container class="main-container">
            <el-main class="main wrapped">
                <c-bubble
                    :user=testUser
                >
                <template #header>
                    大家好啊，
                </template>
                <template #message>
                    我是说的道理
                </template>
                </c-bubble>
            </el-main>

            <el-aside class="aside wrapped">
                <el-card>
                    <h2>我是帖子标题</h2>
                </el-card>
            </el-aside>
        </el-container>

        <el-footer>
            <c-footer />
        </el-footer>

    </el-container>
</template>

<script setup lang="ts">
import type { User } from '@/interface';

import CHeader from '@/components/layout/CNav.vue';
import CFooter from '@/components/layout/CFooter.vue';

import CBubble from '@/components/common/CBubble.vue';


import { ElContainer, ElAside, ElHeader, ElFooter, ElMain } from 'element-plus';
import { ElCard } from 'element-plus';

import { ref } from 'vue';


const testUser = ref<User>({
    id: 1,
    name: '椛儿',
    avatar: '/src/assets/1.png',
    status: 1
});

</script>

<style scoped lang="scss">
.wrapped {
    position: relative;
}

.main-container {
    justify-content: center;
}

.main {
    max-width: 800px;
    min-height: 100vh;

    justify-content: center;
}

.aside {
    max-width: 300px;
}

.full-container {
    min-height: 150vh;
}
</style>