import Buy from './pages/Buy'
import Profile from './pages/Profile'

export default function App() {
  const path = window.location.pathname

  if (path === '/buy') return <Buy />
  return <Profile />
}
