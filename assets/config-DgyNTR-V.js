import{bW as o,b6 as n,be as i,bf as a}from"./index-BRCLu9w8.js";const d=o("info",()=>{async function r(){const s=n();return await i({url:"http://43.143.171.43:9999/api/board/list",method:"POST",data:{token:s.getToken()},withCredentials:!0}).then(e=>e.data.boards).catch(e=>{let t=e.response;return!t||!t.data?a({title:"未知错误",message:"",type:"error"}):a({title:"版块列表获取失败",message:t.data.message,type:"error"}),[]})}return{getBoards:r}});export{d as u};