<template>
    <el-footer class="footer">
        <p>
            <el-text type="primary">由 HIT Touhou Team 基于 Element Plus 编写。保留所有权利。</el-text>
        </p>
        <p>
            <el-text type="primary">2024 年 4 月 15 日。</el-text>
        </p>
    </el-footer>
</template>

<script setup lang="ts">
import { ElText, ElFooter } from 'element-plus';

</script>

<style scoped lang="scss">
.footer {
    display: block;
    text-align: center;

    height: 100px;

    border-top: 4px solid var(--el-color-primary);
    background-color: var(--el-color-primary-light-7);
}

</style>