let css = require('css');

module.exports = function(source,map) {
    let stylesheet = css.parse(source);
    let path = this.resourcePath;
    // console.log(this);
    let name = path.match(/([^/]+).css$/)[1];
    console.log(name);
    for(let rule of stylesheet.stylesheet.rules) {

        rule.selectors = rule.selectors.map(selector => 
            selector.match(new RegExp(`^.${name}`)) ? selector:
            `.${name} ${selector}`);
        
    }
    
    console.log();
    return `let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(css.stringify(stylesheet))};
    document.documentElement.append(style);`;
}