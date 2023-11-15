import { create } from 'zustand'
import { WebsiteState } from './WebsiteState'

export const useWebsiteStore = create<WebsiteState>()(
  (setter) => new WebsiteState(setter)
)

export const IsMobile = () => {
  return useWebsiteStore((state:WebsiteState)=>{
      return state.isMobile
  })
}
export const ScreenWidth = () => {
  return useWebsiteStore((state:WebsiteState)=>{
      return state.screenWidth
  })
}