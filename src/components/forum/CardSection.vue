<template>
    <div class="card">
        <div class="header">
            <div class="title">
                {{ prop.title }}
            </div>
            <div class="description">
                雾之湖是这样子的
            </div>
        </div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus';

const prop = defineProps<{
    title: string,
    color: string
}>();

</script>

<style scoped lang="scss">
.card {
    overflow: visible;
    
    background-color: red;

    border: 2px solid blue;
}
.header {
    display: flex;

    background-color: var(--el-bg-color);

    font-size: larger;

    padding: 0.5em 1em;
    margin-left:  -1em;
    margin-right: -1em;

    z-index: 100;
}

.title {
    font-size: larger;
}

.description {
    font-size: small;
}
</style>