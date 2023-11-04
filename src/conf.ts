const PROMPT =
  "请帮我review下面的代码,给出具体的修改理由,对于代码总体的评价,以及修改后的代码: \n\n";

const SERVER = "https://review-api.cc98-summary.top/";
// const SERVER = 'http://localhost:3000/';

const IGNORE_FILE = [
  "package-lock.json",
  "package.json",
  ".gitignore",
  "CHANGELOG.md",
  "README.md",
  "LICENSE",
  "REVIEW.md",
  "conf.ts",
  "tsconfig.json",
];

const REVIEW_FILE_EXTENSION = [
  ".js",
  ".ts",
  ".jsx",
  ".tsx",
  ".TS",
  ".JS",
  ".TSX",
  ".JSX",
];

const REVIEW_FILE_PATH = "./REVIEW.md";

export { PROMPT, IGNORE_FILE, REVIEW_FILE_EXTENSION, REVIEW_FILE_PATH, SERVER };
