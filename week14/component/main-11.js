// require('./foo');
class Mycomponent {
    constructor(config) {
        this.child = [];
        this.root = document.createElement('div');
    }
    set id(v) { //property
        console.log('parent:id',v);
    }
    setAttribute(name,value) {
        // console.log(name,value);
        this.root.setAttribute(name,value);
    }
    appendChild(child){
        // this.root.appendChild(child);
        // child.mountTo(this.root);
        // this.slot.appendChild(child);
        this.child.push(child);
    }
    render() {
        
        return <article>
        <h1>{this.attributes.get("title")}</h1>
        <h1>{this.properties.get("title")}</h1>
        <header>I'm a header</header>
        {this.slot}
        <footer>I'm a footer</footer>
      </article>
    }
    mountTo(parent) {
        this.slot = <div></div>;
        // parent.appendChild();
        
        for(let child of this.child) {
            // child.mountTo(this.slot);
            this.slot.appendChild(child);
        }
        this.render().mountTo(parent);
    }
    // appendChild(child) {
    //     console.log('appendChild',child)
    // }
}

class Text{
    constructor(text) {
        this.child = [];
        this.root= document.createTextNode(text);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}
class Wraper {
    constructor(type) {
        this.child = [];
        this.root = document.createElement(type);
    }
    set id(v) { //property
        console.log('parent:id',v);
    }
    setAttribute(name,value) {
        // console.log(name,value);
        this.root.setAttribute(name,value);
    }
    appendChild(child){
        // this.root.appendChild(child);
        // child.mountTo(this.root);
        this.child.push(child);
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
// class Child{
//     constructor(config) {
//         this.child = [];
//         this.root = document.createElement('div');
//     }
//     set id(v) { //property
//         console.log('parent:id',v);
//     }
//     setAttribute(name,value) {
//         // console.log(name,value);
//         this.root.setAttribute(name,value);
//     }
//     appendChild(child){
//         // this.root.appendChild(child);
//         child.mountTo(this.root);
//     }
//     mountTo(parent) {
//         parent.appendChild(this.root);
//     }
// }
// let component = <div id="a" class="b" style="width:100px;height:100px;background:red;" >
//     <div>123</div>
//     <p></p>
//     <div></div>
// </div>;
let component = <Mycomponent><div>123</div></Mycomponent>
// component.id = 'c';
component.mountTo(document.body);
function create(Cls, attributes,...children) {

    let o ;
    if(typeof Cls === 'string') {
        o = new Wraper(Cls);
        // return ;
    } else {
        o = new Cls({
            time: 'time'
        });
    }
    
    for(let name in attributes) {
        o.setAttribute(name,attributes[name]);
    }
    for(let child of children) {
        if(typeof child === 'string') {
            child = new Text(child);
        }
        o.appendChild( child);
        // o.child.push(child);
    }
    console.log(children);
    return o;
}
// component.setAttrbute("id", "a");

// component.id = "b";
console.log(component);