import Vue from "vue";
import VueRouter from "vue-router";
import Administration from "../views/Administration.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Manage Certificate Profiles",
    component: Administration
  },
  {
    path: "/view/:id",
    name: "View",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/View.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
