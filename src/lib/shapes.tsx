export class Color {
    constructor(readonly hex: string, readonly label: string){}
}

type Props = {
  height: string
  width: string
  fill: string
}

export abstract class Shape {
  constructor(readonly shape: string, readonly label: string, public color?: Color){}

  abstract render(props: Props): JSX.Element;

  abstract clone(): Shape;

  textOverlay(): JSX.Element {
    return <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="central" dominantBaseline="central" fontSize="12rem" fillOpacity="0">{this.shape}</text>
  }
}

class Hexagon extends Shape {
  constructor() {
    super('⬢', 'hexagon')
  }


  render({height, width, fill}: Props) {
    return (<svg width={width} height={height} viewBox="0 0 72.4 86.6" xmlns="http://www.w3.org/2000/svg"><g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="9pt" stroke={fill} strokeWidth="0.25mm" fill={fill} style={{"stroke":fill,"strokeWidth":"0.25mm","fill":fill}}><path d="M 72.4 64.5 L 36.2 86.6 L 0 64.5 L 0 22.1 L 36.2 0 L 72.4 22.1 L 72.4 64.5 Z" vectorEffect="non-scaling-stroke"/></g>{this.textOverlay()}</svg>)
  }

  clone() {
    return new Hexagon()
  }
}

class Square extends Shape {
  constructor() {
    super('◼', 'square')
  }

  render({height, width, fill}: Props) {
    return (<svg width={width} height={height} viewBox="0 0 60.8 60.8" xmlns="http://www.w3.org/2000/svg"><g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="9pt" stroke={fill} strokeWidth="0.25mm" fill={fill} style={{"stroke":fill,"strokeWidth":"0.25mm","fill":fill}}><path d="M 60.8 60.8 L 0 60.8 L 0 0 L 60.8 0 L 60.8 60.8 Z" vectorEffect="non-scaling-stroke"/></g>{this.textOverlay()}</svg>)
  }

  clone() {
    return new Square()
  }
}

class Diamond extends Shape {
  constructor() {
    super('◆', 'diamond')
  }

  render({height, width, fill}: Props) {
    return (<svg width={width} height={height} viewBox="0 0 100.7 100.7" xmlns="http://www.w3.org/2000/svg"><g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="9pt" stroke={fill} strokeWidth="0.25mm" fill={fill} style={{"stroke":fill,"strokeWidth":"0.25mm","fill":fill}}><path d="M 100.7 50.4 L 50.4 100.7 L 0 50.4 L 50.4 0 L 100.7 50.4 Z" vectorEffect="non-scaling-stroke"/></g>{this.textOverlay()}</svg>)
  }

  clone() {
    return new Diamond()
  }
}

class BRTriangle extends Shape {
  constructor() {
    super('◢', 'bottom-right triangle')
  }

  render({height, width, fill}: Props) {
    return (<svg width={width} height={height} viewBox="0 0 59.8 59.8" xmlns="http://www.w3.org/2000/svg"><g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="9pt" stroke={fill} strokeWidth="0.25mm" fill={fill} style={{"stroke":fill,"strokeWidth":"0.25mm","fill":fill}}><path d="M 59.8 59.8 L 0 59.8 L 59.8 0 L 59.8 59.8 Z" vectorEffect="non-scaling-stroke"/></g>{this.textOverlay()}</svg>)
  }

  clone() {
    return new BRTriangle()
  }
}

class BLTriangle extends Shape {
  constructor() {
    super('◣', 'bottom-left triangle')
  }

  render({height, width, fill}: Props) {
    return (<svg width={width} height={height} viewBox="0 0 59.8 59.8" xmlns="http://www.w3.org/2000/svg"><g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="9pt" stroke={fill} strokeWidth="0.25mm" fill={fill} style={{"stroke":fill,"strokeWidth":"0.25mm","fill":fill}}><path d="M 0 59.8 L 0 0 L 59.8 59.8 L 0 59.8 Z" vectorEffect="non-scaling-stroke"/></g>{this.textOverlay()}</svg>)
  }

  clone() {
    return new BLTriangle()
  }
}

class ULTriangle extends Shape {
  constructor() {
    super('◤', 'upper-left triangle')
  }

  render({height, width, fill}: Props) {
    return (<svg width={width} height={height} viewBox="0 0 59.8 59.8" xmlns="http://www.w3.org/2000/svg"><g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="9pt" stroke={fill} strokeWidth="0.25mm" fill={fill} style={{"stroke":fill,"strokeWidth":"0.25mm","fill":fill}}
><path d="M 0 0 L 59.8 0 L 0 59.8 L 0 0 Z" vectorEffect="non-scaling-stroke"/></g>{this.textOverlay()}</svg>)
  }

  clone() {
    return new ULTriangle()
  }
}

class URTriangle extends Shape {
  constructor() {
    super('◥', 'upper-right triangle')
  }

  render({height, width, fill}: Props) {
    return (<svg width={width} height={height} viewBox="0 0 59.8 59.8" xmlns="http://www.w3.org/2000/svg"><g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="9pt" stroke="#000" strokeWidth="0.25mm" fill={fill} style={{"stroke":fill,"strokeWidth":"0.25mm","fill":fill}}><path d="M 59.8 0 L 59.8 59.8 L 0 0 L 59.8 0 Z" vectorEffect="non-scaling-stroke"/></g></svg>)
  }

  clone() {
    return new URTriangle()
  }
}

export const ALL_SHAPES = [
    new Hexagon(),
    new Square(),
    new Diamond(),
    new BRTriangle(),
    new BLTriangle(),
    new URTriangle(),
    new ULTriangle()
  ]

