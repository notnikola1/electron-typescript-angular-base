const {spawn, exec} = require('child_process');
const chalk = require('chalk');
const platform = process.platform === 'win32' ? 'npm.cmd' : 'npm';
let electronProcess;

function runDevServer(){
    console.log(chalk.underline.blue('Starting Angular dev server'));
    let angularServer = spawn(platform, ['run', 'start']); //starts ng serve

    angularServer.stdout.on('data', (data) => {
        console.log(chalk.cyan(`Angular Server Message: ${data}`));
    });

    console.log(chalk.blue('Building Electron app...'));
    

    let buildElectron = platform + ' run build-electron'; //builds electron app from ts
    exec(buildElectron, {}, (msg) => {
        if(msg == null) {
            console.log(chalk.green(`Electron app built!`));
        } else {
            console.log(chalk.white(`Electron console: ${msg}`));
        }
    });

    console.log(chalk.green(`All appears well so far...`));
    
    // waiting on localhost:4200 to become available
    electronProcess = spawn(platform, ['run', 'wait-on-angular']).on('exit', () => {
        const command = 'cross-env ENV=dev electron ./dist/app/App.js'
        // run built electron app with localhost:4200
        setTimeout(function(){console.log(chalk.green(`Found angular server!
        All appears good, starting Electron App`))},200);

        let electronWindow = exec(command).on('close', () => {
            //cleanup on exit
            electronProcess.kill(0);
            electronWindow.kill(0);
            angularServer.kill(0);
        });

    });
}
runDevServer()
