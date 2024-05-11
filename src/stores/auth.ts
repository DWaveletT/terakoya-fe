import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/interface';


export const useAuth = defineStore('auth', () => {

    let login = ref(sessionStorage.getItem('login') === 'true');
    let token = ref(sessionStorage.getItem('token') || '');

    const currentUser = ref<User>({
      id: 0,
      name: '尚未登录',
      role: 0
    });

    function setLogin(l: boolean){
      login.value = l;
      sessionStorage.setItem('login', String(l));
    }
    function setToken(t: string) {
      token.value = t;
      sessionStorage.setItem('token', String(t));
    }
    function getLogin(){
      return login.value;
    }
    function getToken(){
      return token.value;
    }

    return { setLogin, setToken, getLogin, getToken, currentUser };
});
