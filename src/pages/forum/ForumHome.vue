<template>
    <el-container class="full-container">

        <el-header class="wrapped" style="height: auto; padding: 0;">
            <img src="../../assets/banner.png" width="100%" style="margin-bottom: -60px;">

            <c-nav />
        </el-header>

        <div class="main-container">
            <el-main class="main">
                <block-hotspot />
                <block-section />
            </el-main>
        </div>

        <c-footer />
    </el-container>
</template>

<script setup lang="ts">
import CNav from '@/components/layout/CNav.vue';

import CFooter from '@/components/layout/CFooter.vue';

import BlockHotspot from '@/components/forum/BlockHotspot.vue';
import BlockSection from '@/components/forum/BlockSection.vue';

import { ElContainer, ElHeader, ElMain } from 'element-plus';

import { ref } from 'vue';

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

.full-container {
    min-height: 150vh;
}

.flex-grow {
    flex-grow: 1;
}
</style>