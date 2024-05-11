<template>
    <el-affix target=".main-container" :offset="20">
        <el-card>
            <h3 class="title">版块选择</h3>
            <div class="boards">
                <el-scrollbar height="200px">
                    <div v-if="props.all" class="board-item all" :class="{ 'selected-all': boardId === 0 }"
                        @click="boardId = 0">
                        所有版块
                    </div>
                    <div v-for="board in boards" :key="board.id" class="board-item"
                        :class="{ selected: boardId === board.id }" @click="boardId = board.id">
                        {{ board.name }}
                    </div>
                </el-scrollbar>
            </div>
        </el-card>
        <el-card style="margin-top: 0.5em">
            <h3 class="title">版块说明</h3>
            <p>{{ getDescription() }}</p>
        </el-card>
    </el-affix>
</template>

<script setup lang="ts">
import { ElAffix, ElCard, ElScrollbar } from 'element-plus';

import { computed, onMounted, ref } from 'vue';
import { useInfo } from '@/stores/config';
import { useAuth } from '@/stores/auth';
import type { Board } from '@/interface';

const props = withDefaults(defineProps<{
    all?: boolean
}>(), {
    all: false
});

const auth = useAuth();
const info = useInfo();

const boards = ref<Board[]>([]);

onMounted(() => {
    info.getBoards().then((b) => boards.value = b);
})

const boardId = defineModel<number>({ required: true });

function getDescription(){
    return boards.value.find((b) => b.id === boardId.value )?.description || '';
}


</script>

<style scoped lang="scss">
.board-item {
    padding: 0.5em 1em;
    margin: 0 0;

    color: var(--el-color-primary-dark-2);
    background-color: var(--el-color-primary-light-8);

    transition: background-color 0.2s ease-in-out;

    &.all {
        color: var(--el-color-success-dark-2);
        background-color: var(--el-color-success-light-8);
    }

    &.selected {
        color: white;
        background-color: var(--el-color-primary);
    }

    &.selected-all {
        color: white;
        background-color: var(--el-color-success);
    }

    &:not(:last-child) {
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