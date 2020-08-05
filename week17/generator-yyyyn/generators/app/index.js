var Generator = require('yeoman-generator');

  module.exports = class extends Generator {
    constructor (args,opts) {
        super(args,opts)
    }
    // async prompting() {
    //     const answers = await this.prompt([
    //       {
    //         type: "input",
    //         name: "name",
    //         message: "Your project name",
    //         default: this.appname // Default to current folder name
    //       },
    //       {
    //         type: "confirm",
    //         name: "cool",
    //         message: "Would you like to enable the Cool feature?"
    //       }
    //     ]);
    
    //     this.log("app name", answers.name);
    //     this.log("cool feature", answers.cool);
    //   }
//     async prompting() {
//         this.answers = await this.prompt([
//         {
//             type: "input",
//             name: "name",
//             message: "Would you like to enable the Cool feature?"
//         }
//         ]);
//   }


// writing() {
//     const pkgJson = {
//       devDependencies: {
//         [this.answers.name]: ''
//       },
//     };

//     // Extend or create package.json file in destination path
//     this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
//   }
//     installingLodash() {
//         this.npmInstall();
//     }
//       writingss() {
//     this.log("cool feature"); // user answer `cool` used
//   }
writing () {
  this.fs.copyTpl(
    this.templatePath('index.html'),
    this.destinationPath('public/index.html'),
    { title: 'Templating with Yeoman', study: '123123' }
  );
}
  };