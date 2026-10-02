'use client'

import { useCallback, useState } from 'react'
import { companyWork, personalWork, rails } from '@/data/work'
import CaseStudyPanel from './case-study-panel'
import ProjectRail from './project-rail'

const ProjectRails = () => {
  const [openId, setOpenId] = useState<string | null>(null)
  const openCase = useCallback((id: string) => setOpenId(id), [])
  const closeCase = useCallback(() => setOpenId(null), [])

  return (
    <>
      {rails.map((rail) => (
        <ProjectRail
          key={rail.kind}
          rail={rail}
          items={rail.kind === 'company' ? companyWork : personalWork}
          onOpenCase={openCase}
        />
      ))}
      <CaseStudyPanel item={companyWork.find((item) => item.id === openId) ?? null} onClose={closeCase} />
    </>
  )
}

export default ProjectRails
