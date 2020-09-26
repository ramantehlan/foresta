import React, { FC, useState, HTMLAttributes } from "react"
import P5 from 'p5';
import {connect} from "react-redux"
import { incrementScore, setUsername } from "../redux/actions"
import { Player } from './Player';
import { Tree } from './Tree';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  incrementScore: () => void
}

const World: FC<Props> = React.memo( (props: Props) => {
// We can use this ref in the div
//const ref = React.createRef()

const sketch = (p5: P5) => {
    let player: Player;
    let trees: Tree[] = [];

    p5.setup = () => {
          //let can = p5.createCanvas(1000, 480);
          let can = p5.createCanvas(p5.windowWidth, 450);
          player = new Player(p5);
          trees.push(new Tree(p5));
          let x = (p5.windowWidth - p5.width) / 2
          let y = (p5.windowHeight - p5.height)
          can.position(x,y)
        };

    p5.keyPressed = () => {
          if (p5.key == ' ') {
                  player.up();
                }
        };

    p5.draw = () => {
          p5.background("white");
          
          for (var i = trees.length - 1; i >= 0; i--) {
                  trees[i].show();
                  trees[i].update();

                  if (trees[i].hits(player)) {
                    props.incrementScore()
                  }

                  if (trees[i].offscreen()) {
                      trees.splice(i, 1);
                 }
            }

          player.update();
          player.show();

          if (p5.frameCount % 90 == 0) {
                  trees.push(new Tree(p5));
                }

        };
}

let world_p5 = new P5(sketch)

return (
  <div>
  </div>
)

})

const mapStatetToProps = state => ({
})

const mapDispatchToProps = { 
  incrementScore: incrementScore,
}

export default connect(mapStatetToProps, mapDispatchToProps)(World)
