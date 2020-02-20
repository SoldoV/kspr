<template>
  <v-content class="login-container">
    <v-container class="pa-0" fluid fill-height>
      <v-layout class="pa-0" align-center justify-center>
        <v-card class="add-wrap">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Add new advertisement</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-text-field
                v-model="name"
                label="Position"
                prepend-icon="person"
                type="text"
                :rules="nameRules"
                :counter="25"
                required
              ></v-text-field>
              <v-text-field
                v-model="surname"
                label="Education"
                prepend-icon="school"
                :rules="surnameRules"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                label="Location"
                v-model="email"
                name="login"
                :rules="surnameRules"
                prepend-icon="location_on"
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
                    label="Duration of the advertisement"
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
              <v-textarea
                label="Job description"
                v-model="username"
                :rules="descriptionRules"
                :counter="1000"
                prepend-icon="description"
                type="text"
                required
              ></v-textarea>
              <v-text-field
                id="password"
                v-model="password"
                :rules="surnameRules"
                label="Number of available positions"
                prepend-icon="format_list_numbered"
                type="number"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid" @click="validate">
              Add advertisement!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'newAdd',
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
      v => v.length <= 25 || 'Must be less than 25 characters'
    ],
    descriptionRules: [
      v => !!v || 'Description is required',
      v => v.length <= 1000 || 'Description must be less than 1000 characters'
    ],
    surnameRules: [v => !!v || 'This field is required']
  }),
  methods: {
    validate() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss">
.add-wrap {
  width: 100%;
}
</style>
