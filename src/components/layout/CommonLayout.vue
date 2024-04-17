<template>
    <el-container class="full-container">
        <el-header height="100px" class="header">
            <p>这里大概会放些什么东西。</p>
        </el-header>

        <slot />

        <el-footer height="100px" class="footer">
            <p>
                <el-text type="primary">由 HIT Touhou Team 基于 Element Plus 编写。保留所有权利。</el-text>
            </p>
            <p>
                <el-text type="primary">2024 年 4 月 15 日。</el-text>
            </p>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
import { ElContainer, ElHeader, ElFooter, ElText } from 'element-plus';
</script>

<style scoped lang="scss">
.full-container {
    min-height: 150vh;
}

.header {
    display: block;
    text-align: center;

    border-bottom: 4px solid var(--el-color-primary);
    background-color: var(--el-color-primary-light-7);

    padding: 0;
}

.footer {
    display: block;
    text-align: center;

    border-top: 4px solid var(--el-color-primary);
    background-color: var(--el-color-primary-light-7);

    padding: 0;
}
</style>