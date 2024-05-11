import type { Board, ErrorResponse } from '@/interface';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import { ElNotification } from 'element-plus';
import { defineStore } from 'pinia'

import { ref } from 'vue';

import { useAuth } from './auth';

interface BoardResponse {
    count: number,
    boards: Board[]
}

export const useInfo = defineStore('info', () => {

    async function getBoards(): Promise<Board[]> {
        const auth = useAuth();
        return await axios<BoardResponse>({
            url: 'http://43.143.171.43:9999/api/board/list',
            method: 'POST',
            data: {
                token: auth.getToken()
            },
            withCredentials: true
        }).then((e: AxiosResponse<BoardResponse>) => {
            return e.data.boards;
        }).catch((e: AxiosError) => {
            let response = e.response;
            if(!response || !response.data){
                ElNotification({
                    title: '未知错误',
                    message: '',
                    type: 'error',
                });
            } else {
                ElNotification({
                    title: '版块列表获取失败',
                    message: (response.data as ErrorResponse).message,
                    type: 'error',
                });
            }
            return [];
        });
    }

    return { getBoards };
});
