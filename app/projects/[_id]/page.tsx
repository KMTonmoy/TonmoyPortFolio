import React from 'react'

interface Project {
  _id: string
  title: string
  description: string
  image?: string
  tags?: string[]
  link?: string
  detailsLink?: string | null
}

interface Props {
  params: {
    _id: string
  }
}

async function fetchProject(id: string): Promise<Project | null> {
  try {
    const res = await fetch(`https://tonmoy-portfolio-back-end.vercel.app/projects/${id}`, {
      cache: 'no-store', // or 'force-cache' if you want caching
    })
    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error('Failed to fetch project data')
    }
    return await res.json()
  } catch {
    return null
  }
}

const ProjectDetailsPage = async ({ params }: Props) => {
  const project = await fetchProject(params._id)

  if (!project) {
    return <div>No project found</div>
  }

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h1>{project.title}</h1>

      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', height: 'auto', marginBottom: 20 }}
        />
      )}

      <p style={{ whiteSpace: 'pre-line' }}>{project.description}</p>

      {project.tags && project.tags.length > 0 && (
        <div>
          <strong>Tags:</strong> {project.tags.join(', ')}
        </div>
      )}

      {project.link && (
        <p>
          <strong>Link:</strong>{' '}
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            {project.link}
          </a>
        </p>
      )}

      {project.detailsLink && (
        <p>
          <strong>Details Link:</strong>{' '}
          <a href={project.detailsLink} target="_blank" rel="noopener noreferrer">
            {project.detailsLink}
          </a>
        </p>
      )}
    </div>
  )
}

export default ProjectDetailsPage
