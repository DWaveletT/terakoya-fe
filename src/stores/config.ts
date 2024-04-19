import { defineStore } from 'pinia'

import { useTestdata } from './test';

export const useInfo = defineStore('info', () => {
    
    const testdata = useTestdata();

    const boards = testdata.testBoard;

    console.log('get board info');

    return { boards }
});
