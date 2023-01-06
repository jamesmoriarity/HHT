export class CardDimensions{
    static windowScale:number = 0.8 
    pixelsPerUnit:number
    targetHeight:number;
    targetHeightUnits:number;
    targetWidth:number;
    targetWidthUnits:number;
    isHorizontal:boolean;
    constructor(){ 
        this.isHorizontal = (window.innerWidth >= window.innerHeight)
        this.pixelsPerUnit = this.getPixelsPerUnit()
        this.targetHeight= this.getTargetHeight()
        this.targetHeightUnits = this.targetHeight/this.pixelsPerUnit
        this.targetWidth = this.getTargetWidth()
        this.targetWidthUnits = this.targetWidth/this.pixelsPerUnit
    }
    getPixelsPerUnit = () => {
        const dimension:number = (this.isHorizontal) ? window.innerHeight : window.innerWidth
        let ppu:number = (-10 + (dimension * .43)) * .975
        if(!this.isHorizontal){
            ppu = ppu *  ((window.innerHeight/window.innerWidth) / 2)
        }
        return ppu
    }
    getTargetHeight = () => {
        const scaledHeight:number = window.innerHeight * CardDimensions.windowScale
        return (this.isHorizontal) ? scaledHeight : (0.5 * scaledHeight)
    }
    getTargetWidth = () => {
        const scaledWidth:number = window.innerWidth * CardDimensions.windowScale
        const targetWidth:number = (this.isHorizontal) ? (0.5 * scaledWidth) : scaledWidth
        return targetWidth
    }
}