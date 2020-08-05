import { create, Text, Wraper } from '../createElement.js'
import {Timeline, Animation} from '../animation/animation'

import{ease} from '../animation/cubicBezier'

import {enableGesture} from '../gesture/gesture'


export class TabPanel {
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

    select(i) {
        
        for(let view of this.childViews) {
            view.style.display = 'none';
        }
        this.childViews[i].style.display= '';
        for(let view of this.titleViews) {
            view.classList.remove('selected');
        }
        this.titleViews[i].classList.add('selected');
    }

    appendChild(child) {
        console.log(child);
        this.child.push(child);
    }
    render() {
        console.log(this.child[0]);
        this.childViews = this.child.map(child => <div style='background:skyblue;min-height:300px'>{child}</div>);
        this.titleViews = this.child.map((child, i) => <div onClick = {() => this.select(i)} style='background:skyblue;'>{child.root.title}</div>);

        setTimeout(() => this.select(0),16);
        let root = <div class='panel'>
            {this.titleViews}
            <div>
                { this.childViews}
            </div>
        </div>;
        
        return root;

    }
    mountTo(parent) {
        this.render().mountTo(parent);
    }
}