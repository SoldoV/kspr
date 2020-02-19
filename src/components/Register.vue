<template>
  <v-content class="login-container">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Register account</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-text-field
                  v-model="name"
                  label="Name"
                  prepend-icon="person"
                  type="text"
                  :rules="nameRules"
                  :counter="15"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="surname"
                  label="Surname"
                  prepend-icon="person"
                  :rules="surnameRules"
                  :counter="15"
                  type="text"
                  required
                ></v-text-field>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Select date of birth"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"
                      >Cancel</v-btn
                    >
                    <v-btn text color="primary" @click="$refs.menu.save(date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
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
                  label="Username"
                  v-model="username"
                  :rules="usernameRules"
                  :counter="15"
                  name="login"
                  prepend-icon="person"
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
                <v-text-field
                  id="repeatPass"
                  :rules="[passRules, passwords]"
                  v-model="repeat"
                  label="Repeat password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                  required
                ></v-text-field>
                <p>Gender:</p>
                <v-radio-group
                  required
                  :rules="[v => !!v || 'You must select gender!']"
                  v-model="spol"
                  row
                >
                  <v-radio label="Male" color="blue" value="male"></v-radio>
                  <v-radio label="Female" color="blue" value="female"></v-radio>
                </v-radio-group>
                <v-select
                  :items="switcharo"
                  label="What are you?"
                  outlined
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary">Add CV</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="!valid" @click="validate">
                Register
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    drawer: null,
    switcharo: ['Company', 'Person'],
    name: '',
    email: '',
    surname: '',
    lazy: false,
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    spol: null,
    repeat: '',
    password: '',
    username: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 15 || 'Name must be less than 15 characters'
    ],
    passRules: [
      v => !!v || 'Password is required',
      v => v.length >= 6 || 'Password must be more than 6 characters'
    ],
    usernameRules: [
      v => !!v || 'Username is required',
      v => v.length <= 15 || 'Username must be less than 15 characters'
    ],
    surnameRules: [
      v => !!v || 'Surname is required',
      v => v.length <= 15 || 'Surname must be less than 15 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  computed: {
    passwords() {
      return () => this.repeat == this.password || 'Password must match';
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style lang="scss"></style>
