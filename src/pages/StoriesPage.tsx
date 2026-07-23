import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { pathways } from '../data/pathways'
import { useStories } from '../hooks/useStories'

export function StoriesPage() {
  const { stories } = useStories()

  return (
    <main className="page">
      <p className="eyebrow">Commodore stories</p>
      <h1 className="display" style={{ fontSize: '1.85rem' }}>
        See what’s possible
      </h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Summer experiences from fellow Commodores—internships, research,
        volunteering, and more. Share yours when you’re ready.
      </p>

      <div className="fab-wrap">
        <Link to="/share" className="btn btn-dark btn-block">
          <Plus size={18} /> Share your experience
        </Link>
      </div>

      <div className="story-list" style={{ marginTop: 20 }}>
        {stories.map((story) => {
          const pathway = pathways.find((p) => p.id === story.pathwayId)
          return (
            <article key={story.id} className="story-card">
              <img
                className="story-photo"
                src={story.photoUrl}
                alt=""
                loading="lazy"
              />
              <div className="story-body">
                <div className="meta-row" style={{ marginBottom: 8 }}>
                  <span className="chip">{story.summerActivity}</span>
                  <span className="chip-muted chip">{story.organization}</span>
                  {pathway ? (
                    <span className="chip-muted chip">{pathway.name}</span>
                  ) : null}
                </div>
                <h3>{story.organization}</h3>
                <p className="muted" style={{ margin: 0, fontSize: '0.92rem' }}>
                  {story.story}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
