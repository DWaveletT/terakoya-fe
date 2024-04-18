<script setup lang="ts">
import { RouterView } from 'vue-router'

import { ElScrollbar } from 'element-plus';

</script>

<template>
    <el-scrollbar height="100vh">
        <RouterView />
    </el-scrollbar>
    
</template>

<style scoped>

</style>
