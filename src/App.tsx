import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { SiteNavbar } from './components/SiteNavbar'
import { FooterSection } from './sections/Footer'
import { ScrollManager } from './components/ScrollManager'
import { Home } from './pages/Home'
import { Resources } from './pages/Resources'
import { BriefDetail } from './pages/BriefDetail'
import { Blog } from './pages/Blog'
import { Article } from './pages/Article'
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
        <Route path="resources" element={<Resources />} />
        <Route path="resources/brief/:id" element={<BriefDetail />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<Article />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
