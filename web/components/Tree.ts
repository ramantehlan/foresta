import P5 from 'p5';

export class Tree {
    private spacing: number = 0;
    private top: number;
    private bottom: number;
    private x: number;
    private w: number = 60;
    private speed: number = 6;

    private highlight: boolean = true;

    constructor(private p5: P5) {
          this.top = p5.random(p5.height / 6, 3 / 4 * p5.height);
          this.bottom = p5.height - (this.top + this.spacing);
          this.x = p5.width;
        }

    public hits(bird): boolean {
          if (bird.y < this.p5.height - this.bottom + 25 && bird.y > this.p5.height - this.bottom - 5) {
                if  (bird.x > this.x - 65 && bird.x < this.x - 35 ) {
                            this.highlight = true;
                            return true;
                }
                }
          this.highlight = false;
          return false;
        }

    public show(): void {
          this.p5.fill(255);
         /* if (this.highlight) {
                  this.p5.fill(255, 0, 0);
                }
          */
          this.p5.fill("green")
          this.p5.noStroke() 
          let tri = this.p5.triangle( 
            this.x - 80, 
            this.p5.height - this.bottom, 
            this.x + 140, 
            this.p5.height - this.bottom, 
            this.x + 30, 
            this.p5.height - this.bottom -80);

          this.p5.fill("#ab6b51")
          this.p5.rect(this.x, this.p5.height - this.bottom, this.w, this.bottom);
          this.p5.fill("#770b0b")
          if(this.highlight){
            this.p5.fill("blue")
          }
          this.p5.circle(this.x - 50, this.p5.height - this.bottom + 10, 30)
          this.p5.circle(this.x - 15, this.p5.height - this.bottom + 10, 30)
          this.p5.circle(this.x - 35, this.p5.height - this.bottom - 25, 30)
        }

    public update(): void {
          this.x -= this.speed;
        }

    public offscreen(): boolean {
          return (this.x < -this.w);
        }
}
