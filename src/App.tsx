import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { SiteNavbar } from './components/SiteNavbar'
import { FooterSection } from './sections/Footer'
import { ScrollManager } from './components/ScrollManager'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

const SiteLayout: React.FC = () => (
  <div className="min-h-screen bg-white text-[var(--text-black,#060A07)] flex flex-col selection:bg-[var(--green-highlight,#05FF3C)] selection:text-black">
    <SiteNavbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <FooterSection />
  </div>
)

export const App: React.FC = () => (
  <BrowserRouter>
    <ScrollManager />
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
