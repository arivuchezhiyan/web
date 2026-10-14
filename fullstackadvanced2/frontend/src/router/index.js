import { createRouter, createWebHistory } from 'vue-router'

// Parent Views
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import DirectoryView from '../views/DirectoryView.vue'

// Child Sub-Views (Nested Routing)
import StudentFormSubView from '../views/home/StudentFormSubView.vue'
import StudentListSubView from '../views/home/StudentListSubView.vue'
import StudentStatsSubView from '../views/home/StudentStatsSubView.vue'
import AboutTechSubView from '../views/about/AboutTechSubView.vue'
import AboutApiSubView from '../views/about/AboutApiSubView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'StudentForm',
        component: StudentFormSubView
      },
      {
        path: 'list',
        name: 'StudentList',
        component: StudentListSubView
      },
      {
        path: 'stats',
        name: 'StudentStats',
        component: StudentStatsSubView
      }
    ]
  },
  {
    path: '/directory',
    name: 'Directory',
    component: DirectoryView
  },
  {
    path: '/about',
    component: AboutView,
    children: [
      {
        path: '',
        name: 'AboutTech',
        component: AboutTechSubView
      },
      {
        path: 'api',
        name: 'AboutApi',
        component: AboutApiSubView
      }
    ]
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
