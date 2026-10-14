import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DirectoryView from '../views/DirectoryView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import StudentForm from '../components/StudentForm.vue'
import StudentTable from '../components/StudentTable.vue'
import StudentStats from '../components/StudentStats.vue'
import AboutTechView from '../views/AboutTechView.vue'
import AboutApiView from '../views/AboutApiView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'home-form',
        component: StudentForm
      },
      {
        path: 'list',
        name: 'home-list',
        component: StudentTable
      },
      {
        path: 'stats',
        name: 'home-stats',
        component: StudentStats
      }
    ]
  },
  {
    path: '/directory',
    name: 'directory',
    component: DirectoryView
  },
  {
    path: '/about',
    component: AboutView,
    children: [
      {
        path: '',
        name: 'about-tech',
        component: AboutTechView
      },
      {
        path: 'api',
        name: 'about-api',
        component: AboutApiView
      }
    ]
  },
  {
    path: '/contact-us',
    name: 'contact',
    component: ContactView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
