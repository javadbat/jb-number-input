import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-number-input",
    path: "./web-component/lib/jb-number-input.ts",
    outputPath: "./web-component/dist/jb-number-input.js",
    tsConfigPath: "./web-component/tsconfig.json",
    umdName: "JBNumberInput",
    external: ["jb-input", "jb-validation", "jb-core", "jb-core/theme", "jb-core/i18n", "jb-icons/minus", "jb-icons/plus"],
    globals: {
      "jb-input": "JBInput",
      "jb-validation": "JBValidation",
      "jb-core": "JBCore",
      "jb-core/theme": "JBCoreTheme",
      "jb-core/i18n": "jb-coreI18N",
      "jb-icons/minus": "JBIconMinus",
      "jb-icons/plus": "JBIconPlus",
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
      "jb-core": "JBCore",
      "jb-core/react": "JBCoreReact",
    },
    umdName: "JBNumberReact",
    dir: "./react",
  },
];
