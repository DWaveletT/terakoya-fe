import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/interface';

export const useAuth = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const currentUser = ref<User | null>(null);

  return { isLoggedIn, currentUser }
});
