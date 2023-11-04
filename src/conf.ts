const PROMPT =
  "请按照angular git commit规范总结下面给出的代码,+号开头的语句代表新增代码,-号开头的语句代表删除代码,并给出总结后的commit message: \n\n";

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
