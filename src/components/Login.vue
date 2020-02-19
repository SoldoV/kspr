<template>
  <v-content class="login-container">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-text-field
                  label="E-Mail"
                  v-model="email"
                  name="login"
                  :rules="emailRules"
                  prepend-icon="email"
                  type="text"
                  required
                ></v-text-field>
                <v-text-field
                  id="password"
                  v-model="password"
                  :rules="passRules"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="validate" :disabled="!valid"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    drawer: null,
    email: '',
    lazy: true,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    valid: true,
    passRules: [
      v => !!v || 'Password is required',
      v => v.length >= 6 || 'Password must be more than 6 characters'
    ]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$router.push('/mainMenu');
      }
    }
  }
};
</script>
<style>
.login-container {
  height: 100%;
}
</style>
