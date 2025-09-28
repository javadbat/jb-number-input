import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-number-input",
    path: "./lib/jb-number-input.ts",
    outputPath: "./dist/jb-number-input.js",
    umdName: "JBNumberInput",
    external: ["jb-input", "jb-validation", "jb-core", "jb-core/theme","jb-core/i18n"],
    globals: {
      "jb-input": "JBInput",
      "jb-validation": "JBValidation",
      "jb-core":"JBCore",
      "jb-core/theme":"JBCoreTheme",
      "jb-core/i18n": "jb-coreI18N"
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-number-input-react",
    path: "./react/lib/JBNumberInput.tsx",
    outputPath: "./react/dist/JBNumberInput.js",
    external: ["jb-number-input", "jb-input/react", "jb-input", "react", "jb-core"],
    globals: {
      react: "React",
      "jb-number-input": "JBNumberInput",
      "jb-input": "JBInput",
      "jb-input/react": "JBInputReact",
      "jb-core":"JBCore",
      "jb-core/react":"JBCoreReact"
    },
    umdName: "JBNumberReact",
    dir: "./react"
  },
];