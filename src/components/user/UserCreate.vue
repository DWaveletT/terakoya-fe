<template>
    <el-dialog width="400px" v-model="show" title="创建账号">
        <el-form class="form-area">
            <el-tooltip
                class="box-item"
                effect="dark"
                :content="tooltips['username']"
                placement="left"
            >
                <el-form-item label="用户名称">
                    <el-input v-model="username" />
                </el-form-item>
            </el-tooltip>

            <el-divider />

            <el-tooltip
                class="box-item"
                effect="dark"
                :content="tooltips['password']"
                placement="left"
            >
                <el-form-item label="设定密码">
                    <el-input v-model="password1" type="password" />
                </el-form-item>
            </el-tooltip>

            <el-form-item label="再次输入">
                <el-input v-model="password2" type="password" />
            </el-form-item>
        </el-form>

        <div class="submit-area">
            <el-link @click="emit('requestLogin')">直接登录</el-link>
            <el-button type="primary">提交</el-button>
        </div>
        
    </el-dialog>
</template>

<script setup lang="ts">
import { ElDialog } from 'element-plus';
import { ElForm, ElInput, ElFormItem, ElButton } from 'element-plus';

import { ElLink, ElTooltip, ElDivider } from 'element-plus';

import { ref } from 'vue';

const show = defineModel<boolean>({ required: true });

const emit = defineEmits<{
    requestLogin: []
}>();

const username = ref('');
const password1 = ref('');
const password2 = ref('');

const tooltips = {
    'username': '由数字、英文字母、符号组成，不超过 15 个字符。',
    'password': '由数字、英文字母、符号组成，不超过 20 个字符。'
}
</script>

<style scoped lang="scss">
.form-area {
    min-height: 40vh;
}
.submit-area {
    display: flex;

    justify-content: space-between;
    align-items: center;
}

.interval {
    > :not(:first-child) {
        margin-left: 1em;
    }
}
</style>
