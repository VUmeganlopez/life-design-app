import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ProgressProvider } from './hooks/useProgress'
import { ReflectionsProvider } from './hooks/useReflections'
import { StoriesProvider } from './hooks/useStories'
import { ValuesProvider } from './hooks/useValues'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ProgressProvider>
        <StoriesProvider>
          <ReflectionsProvider>
            <ValuesProvider>
              <App />
            </ValuesProvider>
          </ReflectionsProvider>
        </StoriesProvider>
      </ProgressProvider>
    </BrowserRouter>
  </StrictMode>,
)
