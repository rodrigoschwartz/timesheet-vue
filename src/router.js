import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: '/index'
    },
    {
      path: "/create",
      name: "create",
      component: () => import("./views/Create.vue")
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: () => import("./views/Edit.vue")
    },
    {
      path: "/index",
      name: "index",
      component: () => import("./views/Index.vue")
    },
  ]
});
