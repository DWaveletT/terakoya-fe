<template>
    <common-layout>
            <el-card class="main-container">
                <el-tabs v-model="curTab">
                    <el-tab-pane label="个性" name="avatar">
                        可以在此处上传你的头像。
                    </el-tab-pane>
                    <el-tab-pane label="帖子" name="post">

                    </el-tab-pane>
                    <el-tab-pane label="安全" name="account">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <h2>修改信息</h2>
                                    <el-form>
                                        <el-form-item label="用户名称">
                                            <el-input v-model="username" />
                                        </el-form-item>

                                        <el-divider />

                                        <el-form-item label="原始密码">
                                            <el-input v-model="password0" type="password" />
                                        </el-form-item>
                                        <el-form-item label="重设密码">
                                            <el-input v-model="password1" type="password" />
                                        </el-form-item>
                                        <el-form-item label="再次输入">
                                            <el-input v-model="password2" type="password" />
                                        </el-form-item>
                                    </el-form>

                                    <div class="button-container">
                                        <el-button type="primary">确认</el-button>
                                    </div>
                            </el-col>

                            <el-col :span="12" class="safety-info">
                                <h2>提示信息</h2>

                                <p>为了防止用户名混淆，我们不允许两个用户拥有相同的用户名。因此若修改用户名后，原本的用户名被其他用户使用，则无法再修改回去。因此请谨慎修改。</p>
                                
                                <p>我们不会将用户的账号信息用于任何非鉴别本站身份的情境下。请放心使用。</p>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
    </common-layout>
</template>

<script setup lang="ts">

import CommonLayout from '@/components/layout/CommonLayout.vue';

import { ElTabs, ElTabPane, ElCard, ElForm, ElFormItem, ElInput, ElDivider, ElButton, ElRow, ElCol } from 'element-plus';

import { ref } from 'vue';

const curTab = ref('avatar');

const username = ref('');
const password0 = ref('');
const password1 = ref('');
const password2 = ref('');

</script>

<style scoped lang="scss">
.main-container {
    max-width: 1080px;

    margin: 1em auto;
}

.button-container {
    display: flex;
    justify-content: right;
}

.safety-info {
    border-left: 1px dashed var(--el-color-info);
}
</style>
