export function routeFromPath(path) {
  // Remove pages folder
  let route = path.substring(5);

  // Remove file extension
  route = route.split(".");
  route.pop();
  route = route.join(".");

  // Remove index
  if (route === "/index") route = "/";
  if (route.endsWith("/index")) route = route.slice(0, route.length - 6);

  return route;
}

export function publicRouteFromPath(path) {
  // Remove public folder
  return path.substring(6);
}
