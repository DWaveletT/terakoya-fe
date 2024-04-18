<template>
    <div class="content">
        <div class="bubble" :style="{'--border-color': borderColor}">
            <div class="header">
                <div class="avatar">
                    <el-avatar :src="'/usericon/' + `${props.user.id}.png`" :size="48" />
                </div>
                <slot name="header" />
            </div>

            <div class="message">
                <slot name="message" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@/interface';

import { ElAvatar } from 'element-plus';

const props = withDefaults(defineProps<{
    user: User,
    borderColor?: string
}>(),{
    borderColor: "var(--el-color-primary)"
});

</script>

<style lang="scss" scoped>

.content {
    position: relative;
    display: block;

    margin-left: 90px;
    margin-bottom: 1em;
}
.bubble {
    position: relative;
    display: block;

    margin-left: -1.3em;

    background-color: #fff;
    border-radius: 4px;
    border: 1px solid var(--border-color);
    box-shadow: 0 1px 3px rgb(26 26 26 / 10%);
    box-sizing: border-box;
}

.header {
    position: relative;
    padding: 10px 15px;

    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: var(--el-color-info-light-8);

    font-size: 14px;
    line-height: 1.2;

    color: #999;

    > *:not(:last-child) {
        margin-right: 0.2rem;
    }
}

.message {
    position: relative;
    padding: 0 1.3em;

    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: #fff;
}

.bubble::before, .bubble::after {
    position: absolute;
    top: 11px;
    right: 100%;
    left: -8px;
    display: block;
    width: 8px;
    height: 16px;
    pointer-events: none;
    content: " ";
    clip-path: polygon(0 50%, 100% 0, 100% 100%);
}

.bubble::before {
    background-color: var(--border-color);
}
.bubble::after {
    margin-left: 1.5px;
    background-color: var(--el-color-info-light-8);
}

.avatar {
    height: 48px;
    width: 48px;

    position: absolute;
    left: -64px;
    top: -4px;

    border-radius: 24px;
    border: 1px solid var(--border-color);
}

</style>
