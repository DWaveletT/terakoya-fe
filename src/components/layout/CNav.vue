<template>
    <el-affix>
        <el-menu
            class="nav"
            default-active="0"
            mode="horizontal"
            :ellipsis="false"
        >
            <el-menu-item index="0">首页</el-menu-item>
            <el-menu-item index="1">板块</el-menu-item>
            <div style="margin-left: auto;" index="2">
                <el-menu-item>
                    搜索
                </el-menu-item>
            </div>
        </el-menu>
    </el-affix>
</template>

<script setup lang="ts">
import { ElAffix, ElMenu, ElMenuItem } from 'element-plus';

</script>

<style scoped lang="scss">
.nav {
    display: flex;
    flex-direction: row;
    background-color: var(--el-color-primary-light-5);
    opacity: 0.5;
}

</style>