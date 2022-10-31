import type { Plugin, PluginOption, UserConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import lessToJS from 'less-vars-to-js';
import type { LibItem } from './modules/vite-plugin-imp';

export type Options = {
  lessVarsFile?: string;
  modifyVars?: Record<string, unknown>;
  libList?: LibItem[];
  replaceMoment?: boolean;
};

const ROOT_DIR = process.cwd();

export default function viteAntDesign(options: Options = {}): PluginOption {
  const { modifyVars, lessVarsFile, libList = [], replaceMoment } = options;

  const lessPlugin: Plugin = {
    name: 'ant-design',
    async config() {
      const allModifyVars = {};

      if (lessVarsFile) {
        const lessVarsContent = await readFile(resolve(ROOT_DIR, lessVarsFile), 'utf-8');
        Object.assign(allModifyVars, lessToJS(lessVarsContent));
      }
      Object.assign(allModifyVars, modifyVars);

      const config: UserConfig = {
        css: {
          preprocessorOptions: {
            less: { javascriptEnabled: true, modifyVars: allModifyVars },
          },
        },
      };

      if (replaceMoment) {
        config.resolve = {
          alias: { moment: 'dayjs' },
        };
      }

      return config;
    },
  };

  const importPlugin = vitePluginImp({
    libList: [
      ...libList,
      {
        libName: 'antd',
        style: (name) => `antd/es/${name}/style`,
      },
    ],
  });

  return [lessPlugin, importPlugin];
}
