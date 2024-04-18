<template>
    <el-dialog width="400px" v-model="show" title="用户登录">
        <el-form class="form-area">
            <el-form-item label="用户">
                <el-input v-model="username" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="password" type="password" />
            </el-form-item>
        </el-form>

        <div class="submit-area">
            <el-space wrap>
                <el-link @click="swtichRegister">注册账号</el-link>
                <!-- <el-link>忘记密码</el-link> -->
            </el-space>
            <el-button type="primary">提交</el-button>
        </div>
        
    </el-dialog>

    <user-create v-model="showReg" @request-login="switchLogin" />
</template>

<script setup lang="ts">
import { ElDialog } from 'element-plus';
import { ElForm, ElInput, ElFormItem, ElButton, ElLink } from 'element-plus';

import { ElSpace } from 'element-plus';

import UserCreate from './UserCreate.vue';

import { ref } from 'vue';

const show = defineModel<boolean>({ required: true });
const showReg = ref(false);

const username = ref('');
const password = ref('');

function switchLogin() {
    showReg.value = false;
    setTimeout(() => {show.value = true}, 300);
}

function swtichRegister() {
    show.value = false;
    setTimeout(() => {showReg.value = true}, 300);
}

// async function doLogin() {

// }

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
