<template>
    <el-affix target=".main-container" :offset="20">
        <el-card>
            <h3 class="title">版块选择</h3>
            <div class="boards">
                <el-scrollbar height="250px">
                    <div
                        v-for="board in info.boards"
                        :key="board.id" class="board-item"
                        :class="{ selected: boardId === board.id }"
                        @click="boardId = board.id"
                    >
                        {{ board.name }}
                    </div>
                </el-scrollbar>
            </div>
        </el-card>
        <el-card style="margin-top: 0.5em">
            <h3 class="title">版块说明</h3>
            <p>{{ boardInfo }}</p>
        </el-card>
    </el-affix>
</template>

<script setup lang="ts">
import { ElAffix, ElCard, ElScrollbar } from 'element-plus';

import { computed } from 'vue';
import { useInfo } from '@/stores/info';

const info = useInfo();

const boardId = defineModel<number>({ required: true });
const boardInfo = computed(() => {
    return info.boards.find((board) => { return board.id === boardId.value })?.description || '请在上方版块列表里选择一个版块。';
});

</script>

<style scoped lang="scss">

.board-item {
    padding: 0.5em 1em;
    margin: 0 0;

    color: var(--el-color-primary-dark-2);
    background-color: var(--el-color-primary-light-8);

    transition: background-color 0.2s ease-in-out;

    &.selected {
        color: white;
        background-color: var(--el-color-primary);
    }

    &:not(:last-child){
        border-bottom: 2px solid var(--el-color-primary);
    }
}

.boards {
    max-height: 250px;

    border-top: 3px solid var(--el-color-primary);
    border-bottom: 3px solid var(--el-color-primary);

    background-color: var(--el-color-primary-light-7);

    cursor: pointer;
}
</style>