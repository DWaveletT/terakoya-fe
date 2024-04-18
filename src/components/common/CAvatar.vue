<template>
    <el-avatar :src="'/usericon/' + `${props.user.id}.png`" :size="props.size" />
</template>

<script setup lang="ts">
import type { User } from '@/interface';

import { ElAvatar } from 'element-plus';

const props = withDefaults(defineProps<{
    user: User,
    size?: number
}>(),{
    size: 48
});

</script>

<style lang="scss" scoped>


</style>
