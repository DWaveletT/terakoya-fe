<template>
    <el-tooltip
        :content="realdate.toLocaleDateString() + ' ' + realdate.toLocaleTimeString()"
        :placement="props.placement"
    >{{
        (realdate.getMonth() + 1).toString() + ' 月 ' + 
        realdate.getDay()        .toString() + ' 日'
    }}</el-tooltip>
</template>

<script setup lang="ts">

import { ElTooltip } from 'element-plus';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    date: Date,
    placement?: string
}>(), {
    placement: 'top'
});

const realdate = computed(() => { return new Date(props.date.getTime() * 1000); })

</script>

<style scoped lang="scss">
</style>