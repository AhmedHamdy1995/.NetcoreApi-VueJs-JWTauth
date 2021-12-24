<template>
    
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container">
      <router-link  to="/" class="navbar-brand" >TPClient</router-link>
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">

            <router-link :to="{name:'home'}"  class="nav-link"> Home </router-link>
            </li>
            <template v-if="authenticated">
            <li class="nav-item" >
              <a class="nav-link"  href="#"> Welcome {{user}}</a>   
            </li>
            <li class="nav-item">
              <router-link :to="{name:'dashboard'}" class="nav-link">Dashboard</router-link>       
            </li>
            <li class="nav-item">
                <a href="#"  class="nav-link"  @click.prevent="signOut">Sign out</a>      
            </li>
            </template>
            <template v-else>
            <li class="nav-item">
                <router-link :to="{name:'signin'}"  class="nav-link">Login</router-link>     
            </li>
            <li class="nav-item">
                <router-link :to="{name:'register'}"  class="nav-link">Register</router-link>      
            </li>
            </template>
        </ul>
      </div>
    </div>
  </nav>

</template>







<script>

import { mapGetters , mapActions } from 'vuex'
export default {
     computed:{
         ...mapGetters({
             authenticated: 'auth/authenticated',
             user: 'auth/user',
         })
     },
     methods:{
       ...mapActions({
           signOutAction: 'auth/signOut'
       }),

       signOut(){
           this.signOutAction().then(()=>{
               this.$router.replace({
                   name:"home"
               })
           })
       }
     }
}
</script>
