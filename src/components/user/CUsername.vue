<template>
    <span>{{ prop.user.name }}<el-tag v-if="prop.user.role === 2" type="success" class="admin">管理</el-tag></span>
</template>

<script setup lang="ts">
import type { User } from '@/interface';

import { ElTag } from 'element-plus';

const prop = defineProps<{
    user: User
}>();

</script>

<style scoped lang="scss">
.admin {
    margin-left: 0.5em;
}
</style>