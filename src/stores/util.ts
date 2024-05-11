import { defineStore } from 'pinia'

import type { BgPost, BgReply, BgUser, Board, Post, Reply, User, UserId } from '@/interface';

import { useRoute, useRouter } from 'vue-router';
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

    function conveyPost(bgPost: BgPost): Post {
        return {
            id: bgPost.id,
            time: bgPost.releasetime,
            
            poster: {
                id: bgPost.posterid,
                name: bgPost.username,
                role: bgPost.role
            },
        
            board: bgPost.board,
        
            title: bgPost.title,
            content: bgPost.content,
        
            like: 0,
            dislike: 0,
        };
    }

    function conveyReply(bgReply: BgReply): Reply {
        return {
            id: bgReply.id,
            time: bgReply.replytime,
            
            replyer: {
                id: bgReply.replyer,
                name: bgReply.username,
                role: bgReply.role
            },
        
            post: bgReply.postid,
        
            content: bgReply.content,
        
            like: 0,
            dislike: 0,
        };
    }

    function conveyUser(bgUser: BgUser): User {
        return {
            id: bgUser.uid,
            name: bgUser.username,
            role: bgUser.role
        };
    }

    return {
        fakeUser, fakePost, fakeBoard, fakeReply, nonePost,
        parseParamInt, parseParamString,
        parseQueryInt, parseQueryString,
        conveyPost, conveyReply, conveyUser
    }
});
