<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <h3 style="margin: 0.5em 0;">账号安全</h3>

            <div>
                <el-button type="danger" plain @click="doUserLogout">退出登录</el-button>

                <span style="margin-left: 1em;">将会登出所有账号。</span>
            </div>
            
            <h3 style="margin: 0.5em 0;">修改信息</h3>
                <el-form>
                    <el-form-item label="用户名称">
                        <el-input v-model="username" />
                    </el-form-item>
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
                    <el-button type="primary" @click="doUserUpdate">确认</el-button>
                </div>
        </el-col>

        <el-col :span="12" class="safety-info">
            <h3>提示信息</h3>

            <p>为了防止用户名混淆，我们不允许两个用户拥有相同的用户名。因此若修改用户名后，原本的用户名被其他用户使用，则无法再修改回去。因此请谨慎修改。</p>
            
            <p>我们不会将用户的账号信息用于任何非鉴别本站身份的情境下。请放心使用。</p>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">

import { ElCol, ElRow, ElButton, ElForm, ElFormItem, ElInput } from 'element-plus';

import { ref } from 'vue';

const username = ref('');
const password0 = ref('');
const password1 = ref('');
const password2 = ref('');

function doUserLogout(){
    console.log('user logout');
}

function doUserUpdate(){
    console.log('user update');
}

</script>

<style scoped lang="scss">

.button-container {
    display: flex;
    justify-content: right;
}

.safety-info {
    border-left: 1px dashed var(--el-color-info);
}
</style>