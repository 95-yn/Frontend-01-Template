import {enableGesture} from './gesture/gesture'
export function create(Cls, attributes,...children) {
    console.log('arguments', arguments);
    let o ;
    if(typeof Cls === 'string') {
        o = new Wraper(Cls);
        // return ;
    } else {
        o = new Cls({
            time: {}
        });
    }
    console.log(attributes);
    for(let name in attributes) {
        o.setAttribute(name,attributes[name]);
    }

    let visit = (children) => {
        console.log(children);
        for(let child of children) {
            if(typeof child === 'object' && child instanceof Array) {
                visit(child);
                continue;
            }
            if(typeof child === 'string') {
                child = new Text(child);
            }
            
            o.appendChild( child);
            // o.child.push(child);
        }
    }
    visit(children);
   
    return o;
}


export class Text{
    constructor(text) {
        this.child = [];
        this.root= document.createTextNode(text);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}
export class Wraper {
    constructor(type) {
        this.child = [];
        this.root = document.createElement(type);
    }
    set id(v) { //property
        console.log('parent:id',v);
    }
    get style (){
        return this.root.style;
    }
    set innerText(text) {
        return this.root.innerText = text;
    }
    get classList() {
        return this.root.classList;
    }
    setAttribute(name,value) {
        this.root.setAttribute(name,value);
        if(name.match(/^on([\s\S]+)$/)) {
            let eventName = RegExp.$1.replace(/^[\S\s]/,c => c.toLowerCase());
            console.log(eventName, value);
            this.addEventListener(eventName,value);
        }
        if(name=== 'enableGesture') {
            console.log(enableGesture);
            enableGesture(this.root);
        }
    }
    getAttribute(name) {
        return this.root[name];
    }
    appendChild(child){
        // this.root.appendChild(child);
        // child.mountTo(this.root);
        this.child.push(child);
    }
    addEventListener() {
        this.root.addEventListener(...arguments);
        console.log(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
        for(let child of this.child) {
            child.mountTo(this.root);
        }
    }
    // appendChild(child) {
    //     console.log('appendChild',child)
    // }
}