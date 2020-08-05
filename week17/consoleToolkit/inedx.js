var tty = require('tty');
var ttys = require('ttys');
var readline = require('readline');

var stdin = ttys.stdin;
var stdout = ttys.stdout

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// async function ask(question) {
//     return new Promise((resolve,reject) => {
//         rl.question(question, (answer) => {
//             resolve(answer);
//         });
//     });
// }

stdin.setRawMode(true)

stdin.resume()

stdin.setEncoding('utf-8')

// stdin.on('data', function(key) {
//     process.stdout.write(key.toString().charCodeAt(0).toString())
// })
function getChar() {
    return new Promise(resolv => {
        stdin.once('data', function(key) {
            resolv(key);
        })
    })
}

function up(n = 1) {
    stdout.write('\033['+n+'A')
}
function right(n = 1) {
    stdout.write('\033['+n+'C')
}
function left(n = 1) {
    stdout.write('\033['+n+'D')
}
function down(n = 1) {
    stdout.write('\033['+n+'B')
}

void async function() {
    stdout.write('please which framework do you want to use ?\n')
    let answer = await options(['vue', 'react', 'angular']);
    // console.log(answer);
    stdout.write('you selected ' + answer + '\n')
    process.exit()
    

    
   
}()

// up();
// up();
// up();

async function options(choices) {
    let selected = 0;
    for(let i = 0; i< choices.length;i++) {
        let choice = choices[i];
        if(i === selected) {
            stdout.write('[x]'+choice + '\n')
        } else {
            stdout.write('[ ]'+choice + '\n')
        }
        
    }
    
    up(choices.length)
    right()
    while(true) {
        let char = await getChar();
        if(char === 'w' && selected > 0) {
            // console.log(selected);
            stdout.write(' ')
            left()
            selected--
            up()
            stdout.write('x')
            left()
        }
        if(char === 's' && selected < choices.length-1) {
            stdout.write(' ')
            left()
            selected++
            down()
            stdout.write('x')
            left()
        }
        if(char === '\r' || char === '\n'){
            down(choices.length - selected)
            left()
            return choices[selected];
        }
    }
    
}