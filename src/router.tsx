import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultErrorComponent: ({ error }) => (
      <div role="alert">{error instanceof Error ? error.message : "This page could not load."}</div>
    ),
    defaultPreloadStaleTime: 0,
  });

  return router;
};
