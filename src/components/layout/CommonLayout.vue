<template>
    <el-container class="full-container" :class="{ 'normal-style': !prop.admin, 'admin-style': prop.admin }">
        <el-header height="100px" class="header">
            <div class="content">
                <div>
                    <el-breadcrumb separator="/" style="margin-top: 1em;">
                        <el-breadcrumb-item v-for="i in prop.bread" :key="i" >{{ i }}</el-breadcrumb-item>
                    </el-breadcrumb>

                    <h2 v-if="prop.title" style="color: var(--theme-color-1);">{{ prop.title }}</h2>
                </div>
            </div>
            
            <div class="user">
                <el-avatar :size="40" />
                <div style="margin-left: 0.5em;">你的名字是</div>
            </div>
        </el-header>

        <div style="flex-grow: 1; display: flex;">
            <slot />
        </div>

        

        <el-footer height="100px" class="footer">
            <p>由 HIT Touhou Team 基于 Element Plus 编写。保留所有权利。</p>
            <p>2024 年 4 月 15 日。</p>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
import { ElContainer, ElHeader, ElFooter, ElBreadcrumb, ElBreadcrumbItem, ElAvatar } from 'element-plus';

const prop = withDefaults(defineProps<{
    admin?: boolean,
    title?: string,
    bread?: Array<string>
}>(), {
    admin: false
});

</script>

<style scoped lang="scss">
.content {
    max-width: 1080px;
    margin: 0 auto;
}

.user {
    position: absolute;

    display: flex;
    align-items: center;

    top: 0;
    right: 60px;

    width: 150px;

    padding: 0.4em 0.5em;

    background-color: rgba(255, 255, 255, 0.5);
    fill-opacity: 0.2;

    color: var(--theme-color-1);

    font-weight: bold;

    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
}


.full-container {
    min-height: 100vh;
}

.normal-style {
    --theme-color-1: var(--el-color-primary);
    --theme-color-2: var(--el-color-primary-light-7);
}

.admin-style {
    --theme-color-1: var(--el-color-success);
    --theme-color-2: var(--el-color-success-light-7);
}

.header {
    display: block;

    border-bottom: 4px solid var(--theme-color-1);
    background-color: var(--theme-color-2);

    padding: 0;
}

.footer {
    display: block;
    text-align: center;

    border-top: 4px solid var(--theme-color-1);
    background-color: var(--theme-color-2);

    padding: 0;

    color: var(--theme-color-1);
}
</style>