/**
 * Smooth-scrolls to a section and records it in the URL. Called from inside a closing side panel, so it clears the
 * panel's scroll lock first; the panel's own cleanup would only run after this click.
 */
export const scrollToSection = (id: string) => {
  document.documentElement.style.overflow = ''
  document.getElementById(id)?.scrollIntoView({ block: 'start' })
  history.replaceState(null, '', `#${id}`)
}
