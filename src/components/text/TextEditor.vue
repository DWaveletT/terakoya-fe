<template>
    <div class="editor">
        <template v-if="preview">
            <div class="view-header">
                <el-button type="primary" @click="preview = false" plain>编辑源码</el-button>
            </div>
            <div class="preview">
                <text-render :content="text" />
            </div>
        </template>
        <template v-else>
            <div class="edit-header">
                <span>支持使用 Markdown 渲染。</span>
                <el-button type="primary" @click="preview = true" plain>查看预览</el-button>
            </div>
            <el-input
                v-model="text"
                style="width: 100%; font-family: monospace;"
                :autosize="{
                    minRows: 10,
                    maxRows: 20
                }"
                resize="none"
                type="textarea"
                :placeholder="prop.placeholder"
                :disabled="prop.disabled"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import { ElInput, ElButton } from 'element-plus';

import TextRender from './TextRender.vue';

import { ref } from 'vue';

const text = defineModel<string>({ required: true });

const prop = withDefaults(defineProps<{
    disabled?: boolean,
    placeholder?: string
}>(), {
    disabled: false,
    placeholder: ''
});

const preview = ref(false);

</script>

<style scoped lang="scss">
.view-header, .edit-header {
    margin-bottom: 1em;
}

.view-header {
    display: flex;
    justify-content: right;
}
.edit-header {
    display: flex;
    justify-content: space-between;
    align-items: end;
}

.preview {
    border: 1px solid var(--el-color-info);
    border-radius: 4px;

    padding: 0.5em;
}
</style>