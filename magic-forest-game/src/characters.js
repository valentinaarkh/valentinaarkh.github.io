class Character{
  constructor(number, name, type, position, max_walk){
    this.current_frame = 1;
    this.start_x = 0;
    this.url = "img/characters/"+type+"_"+name+number+".png";
    this.speed = 200;
    this.image = new Image();
    this.image.src = "img/characters/"+type+"_"+name+number+".png";
    this.max_walk = max_walk || position;
    this.count = 0;
    if (type === "hero"){
      this.frames = 5;
      this.position = position || [0,400];
      this.direction = "right";
        switch(name){
          case "stand":
            this.size = [100,100];
            this.walk = 0;
            break;
          case "hurt":
            this.size = [100,100];
            this.walk = 0;
            this.max_frames = 5;
            break;
          case "walk":
            this.size = [100,100];
            this.walk = 20;
            break;
          case "attak":
            this.size = [200,200];
            this.walk = 0;
            this.max_frames = 5;
            break;
          case "die":
            this.size = [100,120];
            this.walk = 5;
            this.max_walk = 950;
            this.max_frames = 4;
            break;
        }
      }else{
      this.frames = 4;
      this.position = position;
      this.direction = "left";
      switch(name){
        case "walk":
          this.size = [100,120];
          this.walk = 15;
          break;
        case "stand":
          this.size = [100,120];
          this.walk = 0;
          break;
        case "hurt":
          this.size = [125,120];
          this.walk = 0;
          this.max_frames = 3;
          break;
        case "die":
          this.size = [125,120];
          this.walk = 0;
          this.max_frames = 3;
          break;
        case "attak":
          this.size = [200,200];
          this.walk = 0;
          this.max_frames = 2;
          break;
      }
    }
  }
}


 Character.prototype.render = function(ctx,delta){
   if ( this.max_frames != undefined && this.count >= this.max_frames) {
       this.current_farme == this.max_frames-1;
         ctx.drawImage(this.image,this.start_x,0,this.size[0], this.size[1], this.position[0],this.position[1],this.size[0], this.size[1]);
   }else{
     if (this.current_frame >= this.frames){
       this.current_frame = 0;
       this.start_x = 0;
     }
     ctx.drawImage(this.image,this.start_x,0,this.size[0], this.size[1], this.position[0],this.position[1],this.size[0], this.size[1]);
     if ( Math.floor( delta / this.speed) == this.current_frame ){
       this.count++;
       if (this.direction == "right"){
         this.position[0] += this.walk;
       }else{
         this.position[0] -= this.walk;
       }

       this.start_x += this.size[0];
       this.current_frame++;
     }
   }
 }

 export default Character;
