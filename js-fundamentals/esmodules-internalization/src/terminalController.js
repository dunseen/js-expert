import Draftlog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";

import readLine from "readline";
import Person from "./person.js";

export default class TerminalController {
  constructor() {
    this.print = {};
    this.data = {};
  }

  initializeTerminal(database, lang) {
    Draftlog(console).addLineListener(process.stdin);

    this.terminal = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable(database, lang);
  }

  initializeTable(database, lang) {
    const data = database.map((item) => new Person(item).formatted(lang));

    const table = chalkTable(this.getTableOptions(), data);

    this.print = console.draft(table);
    this.data = data;
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOptions, this.data));
  }

  question(msg = "") {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  closeTerminal() {
    this.terminal.close();
  }

  getTableOptions() {
    return {
      lefPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.blueBright("Km Travaled") },
        { field: "from", name: chalk.green("From") },
        { field: "to", name: chalk.yellow("To") },
      ],
    };
  }
}
