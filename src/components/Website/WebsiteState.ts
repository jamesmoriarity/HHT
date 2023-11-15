export class WebsiteState{
    setter:Function
    screenWidth:number
    isMobile:boolean
    constructor(setter:Function){
      this.setter = setter
      this.screenWidth = this.getScreenInnerWidth()
      this.isMobile = this.isScreenMobile()
      this.listenForResize()
    }
    isScreenMobile = () => {
      return (this.getScreenInnerWidth() < 700)
    }
    onResize = () => {
      this.setState({isMobile:this.isScreenMobile(), screenWidth:this.getScreenInnerWidth()})
    }
    listenForResize = () => {
        window.addEventListener("resize", this.onResize);
        return () => window.removeEventListener("resize", this.onResize);
    }
    getScreenInnerWidth = () => {
      return window.innerWidth
    }
    setScreenWidth = (w:number) => {
      return(this.setState({ screenWidth: w }) )
    }
    setIsMobile = (b:boolean) => {
      return(this.setState({ isMobile: b }) )
    }
    setState = (obj:any) => {
      this.setter((state:WebsiteState) => (obj))
    }
  }