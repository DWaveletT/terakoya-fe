import { defineStore } from 'pinia'

import type { Board, Post, Reply, User } from '@/interface';

import { useRoute } from 'vue-router';
import { isArray } from 'element-plus/es/utils/types.mjs';

export const useUtil = defineStore('util', () => {

    const route = useRoute();

    const fakeUser: User = {
        id: 0,
        name: '未知用户',
        role: 1
    };

    const fakePost: Post = {
        id: 0,
        time: 0,
        poster: fakeUser,
        board: 0,
        title: '未知帖子',
        content: '',
        like: 0,
        dislike: 0
    };

    const fakeBoard: Board = {
        id: 0,
        name: '未知版块',
        description: ''
    };

    const fakeReply: Reply = {
        id: 0,
        time: 0,
        replyer: fakeUser,
        post: 0,
        content: '',
        like: 0,
        dislike: 0
    };

    const nonePost: Post = {
        id: 0,
        time: 0,
        poster: fakeUser,
        board: 0,
        title: '不存在的帖子',
        content: '请检查帖子 ID 是否正确',
        like: 0,
        dislike: 0
    };

    function parseParamString(key: string): string | undefined {
        const result = route.params[key];
    
        if(result === null)
            return undefined;
    
        if(isArray(result)){
            if(!result[0]){
                return undefined;
            } else {
                return result[0];
            }
        } else {
            return result;
        }
    }

    function parseParamInt(key: string): number | undefined {
        const result = route.params[key];
    
        if(result === null)
            return undefined;
    
        if(isArray(result)){
            if(!result[0]){
                return undefined;
            } else {
                return parseInt(result[0]);
            }
        } else {
            return parseInt(result);
        }
    }

    function parseQueryString(key: string): string | undefined {
        const result = route.query[key];
    
        if(result === null)
            return undefined;
    
        if(isArray(result)){
            if(!result[0]){
                return undefined;
            } else {
                return result[0];
            }
        } else {
            return result;
        }
    }

    function parseQueryInt(key: string): number | undefined {
        const result = route.query[key];
    
        if(result === null)
            return undefined;
    
        if(isArray(result)){
            if(!result[0]){
                return undefined;
            } else {
                return parseInt(result[0]);
            }
        } else {
            return parseInt(result);
        }
    }

    return {
        fakeUser, fakePost, fakeBoard, fakeReply, nonePost,
        parseParamInt, parseParamString,
        parseQueryInt, parseQueryString,
    }
});
