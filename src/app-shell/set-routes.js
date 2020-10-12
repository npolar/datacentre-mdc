import { Router } from "./router.js";
export const setRoutes = ({ outlet, routes, router = new Router(outlet) }) => {
  router.setRoutes(routes);
};
