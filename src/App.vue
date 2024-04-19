
<template>
    <el-scrollbar wrap-class="scrollbar-wrap" style="height: 100vh;" always ref="scrollbar" >
        <RouterView />
    </el-scrollbar>

    <el-backtop target=".scrollbar-wrap" />
    
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import { ElBacktop, ElScrollbar } from 'element-plus';

import { ref, computed, provide, onMounted } from 'vue';

const scrollbar = ref<InstanceType<typeof ElScrollbar> >(null!);

onMounted(() => {
    provide('scrollbar', scrollbar);
    provide('scrollbar-wrap', scrollbar.value.wrapRef);
})

</script>

<style scoped lang="scss">

</style>
