import Vue from "vue";
import VueRouter from "vue-router";
import Administration from "../views/Administration.vue";
import NotFound from "@/components/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Administration,
    meta: {
      title: "Manage Certificate Profiles"
    }
  },
  {
    path: "/certificates/:id",
    name: "certificate",
    meta: {
      title: ""
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Certificate")
  }, {
    name: "notFound",
    path: "/:pathMatch(.*)*",
    component: NotFound,
    meta: {
      title: "404 Not Found"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
