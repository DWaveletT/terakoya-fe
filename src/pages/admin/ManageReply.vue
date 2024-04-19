<template>
    <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="currentData.total"
        style="justify-content: right; margin-bottom: 1em;"
    />

    <el-table :data="currentData.replys" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="time" label="发布时间" width="120" />
        <el-table-column label="发布用户" width="100">
            <template #default="user">
                {{ user.row.replyer.name }}
            </template>
        </el-table-column>
        <el-table-column prop="post" label="发布帖子" width="100" />
        <el-table-column prop="content" label="内容" min-width="100">
            <template #default="reply">
                <span style="text-wrap: nowrap; text-overflow: hidden;">{{ reply.row.content }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="like" label="点赞量" width="100" />
        <el-table-column prop="dislike" label="点踩量" width="100" />
        <el-table-column fixed="right" label="操作" width="160">
            <template #default>
                <el-button type="primary" plain>编辑</el-button>
                <el-button type="danger" plain>删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="currentData.total"
        style="justify-content: right; margin-top: 1em;"
    />
</template>

<script setup lang="ts">

import { ElTable, ElTableColumn, ElButton, ElPagination } from 'element-plus';

import { useTestdata } from '@/stores/test';

const testdata = useTestdata();

const currentData = {
    total: 1000,
    replys: testdata.testReply
}

</script>

<style scoped lang="scss">
</style>