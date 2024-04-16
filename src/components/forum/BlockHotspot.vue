<template>
    <block-title title="最新动态" />
    <el-row :gutter="20">
        <el-col :span="12">
            <el-card shadow="never">
                <p>最新最热</p>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card shadow="never">
                最新回复
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import BlockTitle from './BlockTitle.vue';

import { ElRow, ElCol } from 'element-plus';
import { ElCard } from 'element-plus';

</script>

<style scoped lang="scss">

</style>