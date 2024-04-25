import Login from "./pages/Login.js";
import Teste from "./pages/Teste.js";


const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: '/', view: Login },
    { path: '/client', view: Teste },
    
  ];

  //test each route for potencial match
  const potentialMaches = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    }
  });

  let match = potentialMaches.find(potentialMach => potentialMach.isMatch) ??
  {
    route: routes[0],
    isMatch: true,
  };

  const view = new match.route.view();

  document.querySelector('#root').innerHTML = '';
  document.querySelector('#root').appendChild(await view.getHtml());
}

window.addEventListener('popstate', router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener('click', e => {
    if(e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});