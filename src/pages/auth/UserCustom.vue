<template>
    <div>
        <h3>我的头像</h3>

        <div class="avatar-area">
            <c-avatar class="avatar-review" :user="auth.currentUser" :size="120" />

            <div class="divider" />

            <el-upload
                action=""
                :show-file-list="false"
            >
                <div class="avatar-uploader">
                    <font-awesome-icon :icon="faPlus" />
                </div>
            </el-upload>

            <div class="avatar-info">
                图片应该为 png 格式，且大小不应该超过 100KB。
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">

import CAvatar from '@/components/common/CAvatar.vue';

import { ElUpload } from 'element-plus';

import { useAuth } from '@/stores/auth';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const auth = useAuth();

</script>

<style scoped lang="scss">
.divider {
    height: auto;
    
    border-right: 1px solid black;

    margin: 0 2em;
}
.avatar-area {
    display: flex;
}

.avatar-uploader {
    height: 120px;
    width: 120px;

    border: 2px dashed var(--el-color-info-light-3);
    border-radius: 4px;

    color: var(--el-color-info-light-3);

    background-color: white;

    justify-content: center;
    align-content: center;

    flex-wrap: wrap;

    display: flex;

    transition: 0.2s border-color ease-in-out, 0.2s color ease-in-out;

    &:hover {
        border-color: var(--el-color-warning);
        color: var(--el-color-warning);
    }
}

.avatar-info {
    margin-left: 2em;

    color: var(--el-color-info);
}

</style>