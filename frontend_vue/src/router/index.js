import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import store from "../store/index";

Vue.use(VueRouter);

const router = new VueRouter({ routes, mode: "history" });
const isAuthRequired = (record) => record.meta.requiresAuth;

router.beforeEach((to, from, next) => {
  const isLogged = !!localStorage.getItem("token");

  store.dispatch("setIsLogged", isLogged);

  if (to.name == "login" && isLogged) {
    next({ name: "Home" });
    return;
  }

  if (to.matched.some(isAuthRequired)) {
    if (!isLogged) {
      next({ name: "Login" });
      return;
    }
  }
  next();
});

export default router;
