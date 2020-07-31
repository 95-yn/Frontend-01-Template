export class Timeline {
  constructor() {
	this.animations = new Set();
	this.finishedAnimations = new Set;
	this.requestID = null;
	this.startTimes = new Map;
    this.state = "init";
    this.tick = () => {
      let t = Date.now() - this.startTime;
      // console.log(t);
      // let animations = this.animations.filter(
      //   (animation) => !animation.finished
      // );
      for (let animation of this.animations) {
        let {
          object,
          property,
          template,
          start,
          end,
          duration,
          delay,
          
          timingFunction,
        } = animation;
		let startTime = this.startTimes.get(animation);
        let progression = timingFunction((t - delay - startTime) / duration); // 0~1之间的整数
        if (t < delay + startTime) {
          continue;
        }
        if (t > duration + delay + startTime) {
          progression = 1;
          // animation.finished = true;
		  this.animations.delete(animation);
		  this.finishedAnimations.add(animation);
        }

        // if (t < delay + startTime) {
        //   continue;
        // }

        let value = animation.valueFromProgression(progression); //value是当前值
        // console.log('progression',progression);
        // console.log(template(value));
        object[property] = template(value);
      }
      if (this.animations.size)
        this.requestID = requestAnimationFrame(this.tick);
      else this.requestID = null;
    };
  }

  start() {
    if (this.state !== "init") {
      return;
	}
	console.log('111112222222222222222222')
    this.state = "playing";
    this.startTime = Date.now();
    this.tick();
  }

  pause() {
	  console.log('pause');
    if (this.state !== "playing") {
      return;
    }
    this.state = "paused";
    console.log(this.requestID);
    this.pauseTime = Date.now();
    if (this.requestID !== null) {
	  cancelAnimationFrame(this.requestID);
	  this.requestID = null;
    }
  }

  resume() {
    if (this.state !== "paused") {
      return;
    }
    this.state = "playing";
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  reset() {
    if (this.state === "playing") {
      this.pause();
    }
	this.animations = new Set;
	this.finishedAnimations = new Set;
    this.requestID = null;
	this.startTimes = new Map;
	this.startTime = Date.now();
	this.parseTime = null;
	this.state= 'init';
  }

  restart() {
    if (this.state === "playing") {
      this.pause();
	}
	for(let animation of this.finishedAnimations) {
		this.animations.add(animation);
	}
	this.finishedAnimations = new Set();
    this.requestID = null;
    this.state = "playing";
	this.startTime = Date.now();
    this.parseTime = null;
    this.tick();
  }

  add(animation, startTime) {
    this.animations.add(animation);
    // animation.finished = false;
    if (this.state === "playing" && this.requestID === null) {
		this.tick();
    }

	if (this.state === "playing"){
		this.startTimes.set(animation,  startTime !== void 0 ? startTime : Date.now() - this.startTime);
	} else {
		this.startTimes.set(animation, startTime !== void 0 ? startTime : 0);
	}
  }

  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}

export class Animation {
  constructor(
    object,
    property,
    template,
    start,
    end,
    duration,
    delay,
    timingFunction
  ) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction;
  }

  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}

export class ColorAnimation {
  constructor(
    object,
    property,
    template,
    start,
    end,
    duration,
    delay,
    timingFunction
  ) {
    this.object = object;
    this.property = property;
    this.template = template || ((v) => `rgba(${v.r},${v.g},${v.b},${v.a})`);
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction;
  }

  valueFromProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    };
  }
}
/*
    let animation = new Animation(object,property,start,end,duration,delay,timingFunction);
    let animation2 = new Animation(object,property,start,end,duration,delay,timingFunction);

    let timeline = new Timeline();

    timeline.add(animation);
    timeline.add(animation2);


    timeline.start();
    timeline.pause();
    timeline.resume();
    timeline.end();


    setTimeout
    setInterval
    requestAnimationFrame


*/
