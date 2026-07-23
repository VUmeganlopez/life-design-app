import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { useProgress } from './hooks/useProgress'
import { HomePage } from './pages/HomePage'
import { IntroPage } from './pages/IntroPage'
import { JourneyPage } from './pages/JourneyPage'
import { PathwayDetailPage } from './pages/PathwayDetailPage'
import { PathwaysPage } from './pages/PathwaysPage'
import { ShareStoryPage } from './pages/ShareStoryPage'
import { StepDetailPage } from './pages/StepDetailPage'
import { StoriesPage } from './pages/StoriesPage'
import { ValuesPage } from './pages/ValuesPage'
import { ResumeCoachPage } from './pages/ResumeCoachPage'

function IntroGate() {
  const { progress } = useProgress()
  if (progress.introSeen) return <Navigate to="/home" replace />
  return <IntroPage />
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<IntroGate />} />
        <Route path="home" element={<HomePage />} />
        <Route path="pathways" element={<PathwaysPage />} />
        <Route path="pathways/:pathwayId" element={<PathwayDetailPage />} />
        <Route
          path="pathways/:pathwayId/steps/:stepId"
          element={<StepDetailPage />}
        />
        <Route path="resume-coach/:pathwayId" element={<ResumeCoachPage />} />
        <Route path="values" element={<ValuesPage />} />
        <Route path="journey" element={<JourneyPage />} />
        <Route path="stories" element={<StoriesPage />} />
        <Route path="share" element={<ShareStoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
