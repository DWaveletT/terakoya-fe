<template>
    <el-container class="full-container">

        <el-header class="wrapped" style="height: auto; padding: 0;">
            <img src="../../assets/banner.png" width="100%" style="margin-bottom: -60px;">

            <c-nav-top />
        </el-header>

        <div class="main-container">
            <el-main class="main">
                <block-hotspot />
                <block-section />
            </el-main>
        </div>

        <el-footer height="100px" class="footer">
            <p>
                <el-text type="primary">由 HIT Touhou Team 基于 Element Plus 编写。保留所有权利。</el-text>
            </p>
            <p>
                <el-text type="primary">2024 年 4 月 15 日。</el-text>
            </p>
        </el-footer>
        
        <el-backtop :right="50" :bottom="50" />
    </el-container>
</template>

<script setup lang="ts">
import CNavTop from '@/components/layout/CNavTop.vue';

import BlockHotspot from '@/components/forum/BlockHotspot.vue';
import BlockSection from '@/components/forum/BlockSection.vue';

import { ElContainer, ElHeader, ElMain, ElBacktop, ElFooter, ElText } from 'element-plus';

// import { ref } from 'vue';

</script>

<style scoped lang="scss">
.wrapped {
    position: relative;
}

.main {
    max-width: 1080px;
    min-height: 100vh;

    justify-content: center;

    margin: 1em auto;

    fill-opacity: 0.5;
}


.flex-grow {
    flex-grow: 1;
}

.footer {
    display: block;
    text-align: center;

    border-top: 4px solid var(--el-color-primary);
    background-color: var(--el-color-primary-light-7);

    padding: 0;
}
</style>