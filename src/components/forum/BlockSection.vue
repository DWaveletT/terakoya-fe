<template>
    <block-title title="板块浏览" />
    <el-row :gutter="30">
        <el-col :span="8">
            <card-section
                title="雾之湖"
                color="blue"
            >
                住在雾之湖的妖精们
            </card-section>
        </el-col>
        <el-col :span="8">
            <card-section
                title="雾之湖"
                color="blue"
            >
                住在雾之湖的妖精们
            </card-section>
            
        </el-col>
        <el-col :span="8">
            <card-section
                title="雾之湖"
                color="blue"
            >
                住在雾之湖的妖精们
            </card-section>
            
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import BlockTitle from './BlockTitle.vue';

import CardSection from './CardSection.vue';

import { ElRow, ElCol } from 'element-plus';

</script>

<style scoped lang="scss">

</style>