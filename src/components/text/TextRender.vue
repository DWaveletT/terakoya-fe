<template>
    <div class="markdown" v-html="mark">
    </div>
    
</template>

<script setup lang="ts">
import { marked } from 'marked';

import { computed } from 'vue';

const prop = defineProps<{
    content: string
}>();

const mark = computed(() => {
    return marked.parse(prop.content) as string;
});

</script>

<style scoped lang="scss">

</style>