import VueRouter from "vue-router";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/login.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/pages/dashboard.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  try {
    const token = localStorage.getItem("token");
    const nextPath = to.path;
    const path = token ? "/dashboard" : "/login";
    if (nextPath === path) {
      return next();
    }
    return next(path);
  } catch (error) {
    console.error(error);
  }
});

export default router;
