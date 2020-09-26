import P5 from 'p5';

export class Player {

    private y: number = 0;
    private x: number = 64;

    private gravity: number = 1.2;
    private lift: number = -35;
    private velocity: number = 0;

    constructor(private p5: P5) {
          this.y = p5.height / 2;
        }

    public show(): void {
          this.p5.fill(0);
          this.p5.rect(this.x, this.y, 40, 40);
        }

    public up(): void {
          this.velocity += this.lift;
        }

    public update(): void {
          this.velocity += this.gravity;
          this.velocity *= 0.9;
          this.y += this.velocity;

          if (this.y > this.p5.height - 40) {
                  this.y = this.p5.height - 40;
                  this.velocity = 0;
                }

          if (this.y < 0) {
                  this.y = 0;
                  this.velocity = 0;
                }
        }
}
