<template>
    <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="currentData.total"
        style="justify-content: right; margin-bottom: 1em;"
    />

    <el-table :data="currentData.users" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="名称" min-width="100" />
        <el-table-column prop="role" label="权限" width="100">
            <template #default="user">
                {{ user.row.role === 1 ? '普通' : '管理' }}
            </template>
        </el-table-column>
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
    users: testdata.testUser
}

</script>

<style scoped lang="scss">
</style>