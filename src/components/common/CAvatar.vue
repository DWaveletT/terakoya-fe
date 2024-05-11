<template>
    <img v-if="user.id === 0" :style="`width: ${size}px; border-radius: 50%;`" src="/usericon/0.png" />
    <span v-else class="icon" v-html="generateAvatar()" />
</template>

<script setup lang="ts">
import type { User } from '@/interface';

import { ElAvatar } from 'element-plus';
import { onMounted } from 'vue';

import identicon from 'identicon.js';

const props = withDefaults(defineProps<{
    user: User,
    size?: number
}>(),{
    size: 48
});

function getRand(x: number){
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    return x;
}

function generateAvatar(){
    let id = props.user.id + 2;
    let st = '';

    st += id, id = getRand(id);
    st += id, id = getRand(id);
    st += id, id = getRand(id);
    st += id, id = getRand(id);
    st += id, id = getRand(id);

    const data = new identicon(
        st, {
            size: props.size,
            format: 'svg'
        }
    ).render().getDump();
    return data;
}

</script>

<style lang="scss" scoped>

</style>
