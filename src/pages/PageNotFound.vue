<template>
    <common-layout
        title="页面不存在"
    >
        <el-card class="error-container">
            <div class="center">
                <img src="/404.png" width="300px">

                <h2 class="title">你来到了不存在的页面……</h2>
                <h3 class="title">满身疮痍</h3>
            </div>
        </el-card>
    </common-layout>
</template>

<script setup lang="ts">
import CommonLayout from '@/components/layout/CommonLayout.vue';

import { ElCard } from 'element-plus';

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