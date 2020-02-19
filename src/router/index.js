import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import mainMenu from "../components/mainMenu.vue";
import editProfile from "../components/editProfile.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/editProfile",
    name: "editProfile",
    component: editProfile
  },
  {
    path: "/mainMenu",
    name: "mainMenu",
    component: mainMenu
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;