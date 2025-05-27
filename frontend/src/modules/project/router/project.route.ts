import { LAYOUT } from '@/app/constants/theme'

export default [
  {
    path: '/projects',
    name: 'project',
    component: () => import('@/modules/project/pages/ProjectView.vue'),
    meta: {
      layout: LAYOUT.SIDEBAR
    }
  },
  {
    path: '/projects/new',
    name: 'project-new',
    component: () => import('@/modules/project/pages/ProjectNewView.vue'),
    meta: {
      layout: LAYOUT.SIDEBAR
    }
  },
  {
    path: '/projects/:id/edit',
    name: 'project-edit',
    component: () => import('@/modules/project/pages/ProjectEditView.vue'),
    meta: {
      layout: LAYOUT.SIDEBAR
    }
  },
]