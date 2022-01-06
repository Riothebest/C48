class Bottle
{
    constructor(x,y,w,h)
    {
        this.x= x
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = loadImage("./assets/waterBottle.png")
        this.lifetime = 200;
        this.kicked = false;
        this.floating = true;
        var options = {
            
        }
        this.body = Bodies.rectangle(x,y,w,h,options);
        World.add(myWorld,this.body);
    }
    display()
    {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x,pos.y);
        rotate(angle)
        imageMode(CENTER);
        image(this.image,0,0,this.w,this.h);
        pop();
    }
}