import readline from "readline";
import chalk from "chalk";

interface IFile {
  name: string;
  content: string;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.emitKeypressEvents(process.stdin);

/**
 * @description 读取命令行输入, 选择要review的变更
 * @returns {string} 选中的要review的变更的代码路径
 */
export function readCmd(changedFiles: Array<IFile>): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
    const options = changedFiles.map((file) => file.name).concat(["确认提交"]);
    const selectedIndex: number[] = [];
    let currIndex = 0;

    const renderOptions = () => {
      console.clear();
      console.log("请选择需要提交的代码：");
      options.forEach((option, index) => {
        if (index === currIndex) {
          console.log(chalk.red.bold(`> ${option}`));
        } else {
          if (selectedIndex.indexOf(index) !== -1) {
            console.log(chalk.green(`✔ ${option}`));
          } else {
            console.log(`  ${option}`);
          }
        }
      });
    };

    renderOptions();
    process.stdin.on("keypress", (str, key) => {
      if (key.name === "up") {
        currIndex = currIndex === 0 ? options.length - 1 : currIndex - 1;
        renderOptions();
      } else if (key.name === "down") {
        currIndex = currIndex === options.length - 1 ? 0 : currIndex + 1;
        renderOptions();
      } else if (key.name === "return") {
        if (currIndex === options.length - 1) {
          console.log(
            "您选择了:\n",
            selectedIndex.map((index) => options[index]).join("\n") +
              "\n开始code review...",
          );
          resolve(selectedIndex.map((index) => options[index]));
          rl.close();
        } else {
          if (selectedIndex.indexOf(currIndex) === -1) {
            selectedIndex.push(currIndex);
          } else {
            selectedIndex.splice(selectedIndex.indexOf(currIndex), 1);
          }
          renderOptions();
        }
      }
    });
  });
}
