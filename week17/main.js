// require('./foo');
import { create, Text, Wraper } from './createElement.js'
import {Carousel} from './Carousel/Carousel'
import { Panel } from './Panel/Panel.js';
import { TabPanel } from './Panel/TabPanel.js';
import { ListView } from './Panel/listView.js';



// component.setAttrbute("id", "a");

// component.id = "b";
// console.log(component);
let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}></Carousel>

// let component = <Panel title='this is mu title' >
//     <span>this is content </span>
// </Panel>

// let component = <TabPanel>
//     <span title='title1' >this is content1 </span>
//     <span title='title2'>this is content2 </span>
//     <span title='title3'>this is content3 </span>
//     <span title='title4'>this is content4 </span>
// </TabPanel>

let data =[
    {
        title: '🐱1',
        url: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    },
    {
        title: '🐱2',
        url: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    },
    {
        title: '🐱3',
        url: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    },
    {
        title: '🐱4',
        url: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    }
]
// let component = <ListView data= {data}>
//     {
//         record => <figure>
//             <img src= {record.url} />
//     <figcaption> {record.title}</figcaption >
//     </figure>
//     }
// </ListView>

// component.id = 'c';
component.mountTo(document.body);

window.panel = component;