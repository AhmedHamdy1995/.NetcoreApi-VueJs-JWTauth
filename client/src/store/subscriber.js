import store from '@/store'
import axios from 'axios'


store.subscribe((mutation)=>{

    // to get the name of the user 
    if(mutation.type == 'auth/SET_USER')
    var user = mutation.payload;

    switch(mutation.type){
        case 'auth/SET_TOKEN':
            if(mutation.payload){
               axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`;
               localStorage.setItem('token',mutation.payload);    
               localStorage.setItem('user',user);              
            }else{
                axios.defaults.headers.common['Authorization'] = null;
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
            break;
    }
})