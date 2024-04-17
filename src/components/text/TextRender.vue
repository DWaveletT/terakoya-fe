<template>
    <div class="markdown">
        <span ref="rendered" />
    </div>
    
</template>

<script setup lang="ts">
import { marked } from 'marked';

import { onMounted, ref } from 'vue';

const prop = defineProps<{
    content: string
}>();

const rendered = ref<HTMLElement>(null!);

onMounted(() => {
    rendered.value.innerHTML = marked.parse(prop.content) as string;
});

</script>

<style scoped lang="scss">

</style>