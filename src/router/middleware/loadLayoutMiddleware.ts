import { RouteLocationNormalized } from 'vue-router';

export default async function name(route: RouteLocationNormalized) {
  try {
    if (route.meta) {
      const layout = route.meta?.layout;

      const layoutComponent = await import(`@/layouts/${layout}.vue`)

      Object.assign(route.meta, { layoutComponent: layoutComponent.default });
    }
  } catch(err) {
    console.error('Error on get layout', err);
    const layout = 'DCDefault';

    const layoutComponent = await import(`@/layouts/${layout}.vue`);

    Object.assign(route.meta || {}, { layoutComponent: layoutComponent.default });
  }
}
