const {spawn, exec} = require('child_process');
const chalk = require('chalk');
const platform = process.platform === 'win32' ? 'npm.cmd' : 'npm';
let electronProcess;

function runDevServer(){
    console.log(chalk.underline.blue('Starting Angular dev server'));
    let angularServer = spawn(platform, ['run', 'start']);

    angularServer.stdout.on('data', (data) => {
        console.log(chalk.cyan(`Angular Server Message: ${data}`));
    });//starts ng serve

    console.log(chalk.blue('Building Electron app...'));
    //runs wait-on and looks for localhost:4200 (angular dev server), once available starts the build electron app that loads localhost:4200;

    let buildElectron = platform + ' run build-electron';
    exec(buildElectron, {}, (msg) => {
        if(msg == null) {
            console.log(chalk.green(`Electron app built!`));
        } else {
            console.log(chalk.white(`Electron console: ${msg}`));
        }
    });

    console.log(chalk.green(`All appears well so far...`));
    electronProcess = spawn(platform, ['run', 'wait-on-angular']).on('exit', () => {
        const command = 'cross-env ENV=dev electron ./dist/app/App.js'

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