import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { pathways } from '../data/pathways'
import { summerActivityOptions } from '../data/stories'
import { useStories } from '../hooks/useStories'

export function ShareStoryPage() {
  const navigate = useNavigate()
  const { addStory } = useStories()
  const [photoUrl, setPhotoUrl] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const onPhoto = (file: File | undefined) => {
    if (!file) {
      setPreview(null)
      setPhotoUrl('')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result)
      setPreview(result)
      setPhotoUrl(result)
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    addStory({
      summerActivity: String(data.get('summerActivity') || ''),
      organization: String(data.get('organization') || '').trim(),
      story: String(data.get('story') || '').trim(),
      photoUrl:
        photoUrl ||
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      pathwayId: String(data.get('pathwayId') || '') || undefined,
    })
    setSubmitted(true)
    window.setTimeout(() => navigate('/stories'), 900)
  }

  return (
    <main className="page">
      <Link to="/stories" className="back-link">
        <ArrowLeft size={16} /> Stories
      </Link>

      <p className="eyebrow">Share your experience</p>
      <h1 className="display" style={{ fontSize: '1.75rem' }}>
        What did you do this summer?
      </h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Tell fellow Commodores about a summer experience—and add a photo if you
        have one.
      </p>

      {submitted ? (
        <div className="insight-box" style={{ marginTop: 24 }}>
          <strong>Experience shared</strong>
          <span className="muted">Taking you back to the feed…</span>
        </div>
      ) : (
        <form className="form" style={{ marginTop: 20 }} onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="summerActivity">What did you do this summer?</label>
            <select id="summerActivity" name="summerActivity" required defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              {summerActivityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="organization">Employer or organization</label>
            <input
              id="organization"
              name="organization"
              required
              maxLength={120}
              placeholder="e.g. Nashville Public Library, Google, VUMC"
            />
          </div>
          <div className="field">
            <label htmlFor="pathwayId">Related pathway (optional)</label>
            <select id="pathwayId" name="pathwayId" defaultValue="">
              <option value="">None</option>
              {pathways.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="story">Your story</label>
            <textarea
              id="story"
              name="story"
              required
              maxLength={800}
              placeholder="What did you learn? What would you tell another student?"
            />
          </div>
          <div className="field">
            <label htmlFor="photo">Photo (optional)</label>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={(e) => onPhoto(e.target.files?.[0])}
            />
            {preview ? (
              <img className="photo-preview" src={preview} alt="Preview" />
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Share experience
          </button>
        </form>
      )}
    </main>
  )
}
