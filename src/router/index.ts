import TuComponente from '../components/TuComponente.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ... tus rutas existentes ...
    {
      path: '/test-conexion',
      name: 'test',
      component: TuComponente
    }
  ]
}) 