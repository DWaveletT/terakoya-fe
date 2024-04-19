<template>
    <el-card shadow="never" class="card">
        <div class="bar-top" />
        <slot />

        <div class="bar-bottom" />
    </el-card>
</template>

<script setup lang="ts">

import { ElCard } from 'element-plus';

</script>

<style scoped lang="scss">

.bar-top {
    height: 10px;

    margin-left:  -25px;
    margin-right: -25px;

    box-sizing: border-box;

    margin-top: -1.5em;
    margin-bottom: 1em;

    border: 2px solid var(--el-color-primary-light-3);
    background-color: var(--el-color-primary-light-7);
}
.bar-bottom {
    height: 10px;

    margin-left:  -25px;
    margin-right: -25px;

    box-sizing: border-box;

    margin-top: 1em;
    margin-bottom: -1.5em;

    border: 2px solid var(--el-color-primary-light-3);
    background-color: var(--el-color-primary-light-7);
}

.card {
    border: 2px solid var(--el-color-primary-light-3);

    background-color: white;
    overflow: visible;

    box-sizing: border-box;
}
</style>