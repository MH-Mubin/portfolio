/**
 * Smooth-scrolls to a section and records it in the URL. Called from inside a closing side panel, so it waits one
 * frame: by then the panel has released its scroll lock and handed focus back, which would otherwise cancel the
 * smooth scroll.
 */
export const scrollToSection = (id: string) => {
  requestAnimationFrame(() => {
    document.documentElement.style.overflow = ''
    document.getElementById(id)?.scrollIntoView({ block: 'start' })
    history.replaceState(null, '', `#${id}`)
  })
}
