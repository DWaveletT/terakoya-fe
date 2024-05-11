<template>
    <common-layout
        title="错误"
    >
        <el-card class="error-container">
            <div class="center">
                <img src="/404.png" width="300px">

                <h2 class="title">权限不足</h2>
            </div>
        </el-card>
    </common-layout>
</template>

<script setup lang="ts">
import CommonLayout from '@/components/layout/CommonLayout.vue';
import { useAuth } from '@/stores/auth';

import { ElCard } from 'element-plus';

const auth = useAuth();

</script>

<style scoped lang="scss">
.error-container {
    flex-grow: 1;
    max-width: 1080px;

    margin: 1em auto;
}

.center {
    text-align: center;
}

</style>