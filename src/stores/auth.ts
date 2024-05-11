import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/interface';

export const useAuth = defineStore('auth', () => {

    let login = ref(sessionStorage.getItem('login') === 'true');
    let token = ref(sessionStorage.getItem('token') || '');

    function readUser(){
      const result = JSON.parse(sessionStorage.getItem('user') || '{}');
      
      const user: User = {
        id: result['id'] || 0,
        name: result['name'] || '未知用户',
        role: result['role'] || 0,
      }
      return user;
    }

    const currentUser = ref<User>(readUser());

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

    function logout(){
      setLogin(false);
      setToken('');
      sessionStorage.setItem('user', '{}');

      currentUser.value = {
        id: 0, name: '未知用户', role: 0
      }
    }

    function setUser(user: User){
      console.log(user);
      
      sessionStorage.setItem('user', JSON.stringify(user));
      currentUser.value = user;
    }

    return { setLogin, setToken, getLogin, getToken, setUser, currentUser, logout };
});
