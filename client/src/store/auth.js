import axios from "axios"

export default ({
    
   namespaced:true,

  state: {
     token: null,
     user: null,
  },
  getters:{
      authenticated(state){
          return state.token!=null ? true:false ;
      },
      user(state){
          return state.user
      }
  },
  mutations: { 
    SET_TOKEN(state,token){
        state.token=token;
    },
    SET_USER(state,user){
        state.user=user;
    }
  },

    actions: {

        // action signIn
        async signIn({ dispatch }, credentials) {

            let response = await axios.post('Auth/login', credentials).catch(e=>{alert(e.message)});
            // .then(()=>{             
            //     alert("the book Updated successfully");
            //  })

            return dispatch('attempt', {
                token: response.data.token,
                user: response.data.username
            })
        },

       // action register
        async register({ dispatch }, credentials) {

        let response = await axios.post('Auth/register', credentials)

            return dispatch('attempt', {
                token: response.data.token,
                user: response.data.username
            })
        
        },

        // action attempt to modify the mutation 
        async attempt({ commit }, payload) {
            commit('SET_TOKEN', payload.token)
            commit('SET_USER', payload.user)
        },

        // action signout to modify the mutation to reset the reset the values in the state
        signOut({ commit }) {
            commit('SET_TOKEN', null)
            commit('SET_USER', null)
        },


        //======================== book actions ========================
       
        // async getAllbooks(){

        //     await axios.get('Book', {
        //         headers:{
        //             'Authorization':'Bearer'+ state.token
        //         }
        //     }).catch(e => {
        //           console.log(e);
        //         });
        // }

    }

})