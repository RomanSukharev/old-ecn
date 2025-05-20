import { useMeQuery } from "@/shared/api/generated";

export default defineNuxtRouteMiddleware(async (to) => {
  console.debug("Auth middleware");

  const token = localStorage.getItem("token");

  if (token) {
    const { onResult, onError } = useMeQuery();

    return new Promise((resolve) => {
      onResult((result) => {
        useState("me", () => result.data.me);
        resolve();
      });

      onError(() => {
        console.log("getMe error, redirecting");
        if (to.path != "/login") {
          localStorage.setItem("returnUrl", to.path);
        }
        localStorage.removeItem("token");
        resolve(navigateTo("/login"));
      });
    });
  } else if (to.path !== "/login") {
    console.debug("No token provided, redirecting...");
    localStorage.setItem("returnUrl", to.path);
    return navigateTo("/login");
  }
});
