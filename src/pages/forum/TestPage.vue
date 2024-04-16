<template>
    <div>
        <h2>测试页面</h2>

        <c-bubble
            :user="testUser"
        >
            <template #header>
                我是 header
            </template>
            <template #message>
                我是一条信息
            </template>
        </c-bubble>
    </div>
</template>

<script setup lang="ts">
import CBubble from '@/components/common/CBubble.vue';

import type { User } from '@/interface';

import { ref } from 'vue';

const testUser = ref<User>({
    id: 1,
    name: '椛儿',
    avatar: '/src/assets/1.png',
    status: 1
});
</script>

<style scoped lang="scss">


</style>