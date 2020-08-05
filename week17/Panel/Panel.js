import { create, Text, Wraper } from '../createElement.js'
import {Timeline, Animation} from '../animation/animation'

import{ease} from '../animation/cubicBezier'

import {enableGesture} from '../gesture/gesture'


export class Panel {
    constructor(config) {
        this.child = [];
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
        this.child.push(child);
    }
    render() {
        let root = <div class='panel'>
            <h1 style='background:lightgreen; margin:0;border-bottom:solid 1px #f5f5f5;'>{this.title}</h1>
            <div style='background:lightgreen;min-height:300px'>
                {this.child}
            </div>
        </div>;
        
        return root;

    }
    mountTo(parent) {
        this.render().mountTo(parent);
    }
}