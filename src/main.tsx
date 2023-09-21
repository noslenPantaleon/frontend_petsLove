import axios from 'axios'
import { configure, observable } from 'mobx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import Layout from './components/Layout/Layout.tsx'
import { AdoptionPetPage } from './pages/AdoptionPetPage/index.tsx'
import { LoginPage } from './pages/LoginPage'
import { AppContextProps } from './services/AppContext.ts'
import { getCookie } from './utils/getCookie.ts'
import './index.css'
import './services/axiosInstance'
import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient()

async function main() {
  if (import.meta.env.DEV) {
    configure({ enforceActions: 'observed' })
  }

  let appContext: AppContextProps = observable({
    session: { token: '' },
    user: null,
  })

  const router = createBrowserRouter([
    {
      path: '/adopt',
      element: <AdoptionPetPage />,
    },
    {
      path: '/',
      element: <LoginPage />,
    },
  ])

  try {
    const token = getCookie('token')

    if (token) {
      const { data } = await axios.get('/api/auth/login/', {
        withCredentials: true,
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      appContext = observable({
        session: { token: token },
        user: data.user,
      })
    } else {
      throw new Error('User not signed in')
    }
  } catch (_e) {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <RouterProvider router={router} />
          </Layout>
        </QueryClientProvider>
      </React.StrictMode>,
    )
    return
  }

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      <App appContext={appContext} />
    </QueryClientProvider>,
  )
}

void main()