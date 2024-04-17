<template>
    <span>{{ prop.user.name }}</span>
</template>

<script setup lang="ts">
import type { User } from '@/interface';

const prop = defineProps<{
    user: User
}>();

</script>

<style scoped lang="scss">

</style>