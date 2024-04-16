<template>
    <el-divider class="divider"><p class="title">{{ prop.title }}</p></el-divider>
</template>

<script setup lang="ts">
import { ElDivider } from 'element-plus';

const prop = defineProps<{
    title: string
}>();

</script>

<style scoped lang="scss">
.divider {
    --el-bg-color: var(--el-color-primary-light-9);
}

.title {
    font-size: large;
}
</style>