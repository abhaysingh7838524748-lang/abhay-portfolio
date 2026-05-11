import { create } from 'zustand'

export type PageRoute = '/' | '/experience' | '/projects' | '/connect'

interface SceneState {
  // Routing
  currentRoute: PageRoute
  previousRoute: PageRoute | null
  isTransitioning: boolean

  // Mouse
  mouseX: number
  mouseY: number
  mouseNormX: number // -1 to 1
  mouseNormY: number // -1 to 1

  // Scroll
  scrollProgress: number // 0 to 1 per page
  scrollY: number

  // Performance
  isMobile: boolean
  isLowPerf: boolean

  // Project gallery
  activeProjectId: string | null
  isProjectExpanded: boolean

  // Contact form
  contactFormStep: number
  isFormSubmitting: boolean
  isFormSubmitted: boolean

  // Actions
  setRoute: (route: PageRoute) => void
  setTransitioning: (v: boolean) => void
  setMouse: (x: number, y: number, nx: number, ny: number) => void
  setScroll: (progress: number, y: number) => void
  setActiveProject: (id: string | null) => void
  setProjectExpanded: (v: boolean) => void
  setContactFormStep: (step: number) => void
  setFormSubmitting: (v: boolean) => void
  setFormSubmitted: (v: boolean) => void
}

export const useSceneStore = create<SceneState>((set) => ({
  currentRoute: '/',
  previousRoute: null,
  isTransitioning: false,

  mouseX: 0,
  mouseY: 0,
  mouseNormX: 0,
  mouseNormY: 0,

  scrollProgress: 0,
  scrollY: 0,

  isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  isLowPerf: false,

  activeProjectId: null,
  isProjectExpanded: false,

  contactFormStep: 0,
  isFormSubmitting: false,
  isFormSubmitted: false,

  setRoute: (route) =>
    set((s) => ({ previousRoute: s.currentRoute, currentRoute: route })),
  setTransitioning: (v) => set({ isTransitioning: v }),
  setMouse: (x, y, nx, ny) =>
    set({ mouseX: x, mouseY: y, mouseNormX: nx, mouseNormY: ny }),
  setScroll: (progress, y) => set({ scrollProgress: progress, scrollY: y }),
  setActiveProject: (id) => set({ activeProjectId: id }),
  setProjectExpanded: (v) => set({ isProjectExpanded: v }),
  setContactFormStep: (step) => set({ contactFormStep: step }),
  setFormSubmitting: (v) => set({ isFormSubmitting: v }),
  setFormSubmitted: (v) => set({ isFormSubmitted: v }),
}))
