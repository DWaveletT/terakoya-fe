<template>
    <p v-for="i in [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, ]">
    asdasd
    </p>
    <!-- <div class="affix-container"> -->
    <!-- </div> -->

    <p v-for="i in [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, ]">
    asdasd
    </p>
    
    <el-backtop :right="50" :bottom="50" />
  </template>

<script setup lang="ts">

import CommonLayout from '@/components/layout/CommonLayout.vue';

import { ElAffix, ElButton, ElBacktop, ElContainer, ElMain, ElAside } from 'element-plus';

import { ref } from 'vue';

const list = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
];

const affix = ref<InstanceType<typeof ElAffix>>(null!);

function update() {
    console.log('hello');

    affix.value.update();
    affix.value.updateRoot();
}

</script>

<style scoped lang="scss">
.affix-container {
  text-align: center;
  height: 400px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
}
</style>