import { create, Text, Wraper } from '../createElement.js'
import {Timeline, Animation} from '../animation/animation'

import{ease} from '../animation/cubicBezier'

import {enableGesture} from '../gesture/gesture'


export class ListView {
    constructor(config) {
        this.child = [];
        this.attributes= new Map;
        this.properties= new Map;
        this.state = Object.create(null);
        this.root = document.createElement('div');
    }
    set id(v) { //property
        console.log('parent:id', v);
    }
    setAttribute(name, value) {
        // console.log(name,value);
        this[name] = value;
    }
    getAttribute(name) {
        // console.log(name,value);
         return this[name];
    }
    appendChild(child) {
        console.log(child);
        this.child.push(child);
    }

    render() {
        let data = this.getAttribute('data');
        // console.log('saadddddddddddddddddddd',this.child);
        let root = <div class='panel'>
                {   
                    // this.child[0]
                    data.map(this.child[0])
                }
        </div>;
        
        return root;

    }
    mountTo(parent) {
        this.render().mountTo(parent);
    }
}