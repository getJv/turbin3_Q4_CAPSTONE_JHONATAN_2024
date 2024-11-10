import { UiLayout } from '@/components/ui/ui-layout'
import { lazy } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const DashboardFeature = lazy(() => import('../components/dashboard/dashboard-feature'))
const CounterFeature = lazy(() => import('../components/counter/counter-feature.tsx'))

const links: { label: string; path: string }[] = [
  {
    label: "counter",
    path: "counter",
  }
]


const routes: RouteObject[] = [
  {
    path: "/counter",
    element: <CounterFeature/>
  }
]
export function AppRoutes() {
  const router = useRoutes(
    [
      { index: true, element: <Navigate to={'/dashboard'} replace={true} /> },
      { path: '/dashboard', element: <DashboardFeature /> },
      ...routes,
      { path: '*', element: <Navigate to={'/dashboard'} replace={true} /> },
  ])
  return <UiLayout links={links}>{router}</UiLayout>
}
