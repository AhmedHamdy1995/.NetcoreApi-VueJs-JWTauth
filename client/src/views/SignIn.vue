<template>
  <!-- <div class="row">
     <div class="col-3"></div>
     <div class="col-6">
      <form  @submit.prevent="submit">
            <h1 class="h3 mb-3 fw-normal text-center"> sign in</h1>                       
            <input v-model="form.email" type="email" class="form-control" id="floatingInput" placeholder="email">
            <input v-model="form.password"  type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
      </div>
    <div class="col-3"></div>
  </div> -->

  <div class="row text-center">
    <div class="col-4"></div>
    <div class="col-4">
      <div class="card shadow mb-4 borderless">
        <div class="row align-items-center">
          <div class="col-md-12">
            <form @submit.prevent="submit">
              <div class="card-header py-3">
                <h2>Login</h2>
              </div>
              <div class="card-body">
                <div class="form-group mb-3">
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    id="Email"
                    placeholder="Email address"
                  />
                </div>
                <div class="form-group mb-4">
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    id="Password"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group mb-4">
                  <button
                    class="btn btn-primary mb-4"
                    style="width: 100%"
                    type="submit"
                  >
                    Signin
                  </button>
                </div>

                <hr />
                <p class="mb-0 text-muted">
                  Don’t have an account?
                  <router-link :to="{ name: 'register' }" class="nav-link"
                    >Register</router-link
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "signin",
  components: {
    //
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/signIn",
    }),

    submit() {
        this.signIn(this.form).then(() => {
        this.$router.replace({
          name: "dashboard",
        })
      }).catch(e=>{alert(e.message)});

    },
  },
};
</script>


