import inquirer from "inquirer"
import chalk from "chalk"

const Apilink: string = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple"

let fetchData = async (Data:string) => {
    let fatchQuiz: any = await fetch(Data)
    let res = await fatchQuiz.json()
    return res.results;
}
let Data =  await fetchData(Apilink)

let startQuiz = async () => {
    let Score:number = 0
    let Name = await inquirer.prompt({
        type:`input`,
        name:"username",
        message:"What is your name?"
    })
    for (let i = 1 ; i <5 ; i++){  
        let answers = [...Data[i].incorrect_answers,Data[i].correct_answer];
        let ans = await inquirer.prompt ({
            type:`list`,
            name:"Quiz",
            message:Data[i].question,
            choices:answers.map((val:any)=>val)
        });
        if(ans.Quiz == Data[i].correct_answer){
            ++Score
            console.log(chalk.bold.italic.blue("Correct"))
        }
        // else{
        //     console.log(`correct answer is ${chalk.bold.italic.red(Data[i].correct.asnwers)}`)
        // }
     };
     console.log(Score)
     console.log(`Dear ${chalk.green.bold (Name.username)},Your Score is ${chalk.red.bold(Score)}, out of ${chalk.yellow.bold('5')}`)
};
startQuiz();


