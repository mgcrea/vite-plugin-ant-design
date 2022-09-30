import type { Plugin, PluginOption } from 'vite';
import vitePluginImp from 'vite-plugin-imp';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import lessToJS from 'less-vars-to-js';

export type Options = {
  lessVarsFile?: string;
  modifyVars?: Record<string, unknown>;
  preprocessorOptions?: Record<string, unknown>;
  libList?: LibItem[];
};

const ROOT_DIR = process.cwd();

export default function viteAntDesign(options: Options = {}): PluginOption {
  const { modifyVars, lessVarsFile, preprocessorOptions = {}, libList = [] } = options;
  const plugin: Plugin = {
    name: 'ant-design',
    async config(config) {
      const allModifyVars = {};

      if (lessVarsFile) {
        const lessVarsContent = await readFile(resolve(ROOT_DIR, lessVarsFile), 'utf-8');
        Object.assign(allModifyVars, lessToJS(lessVarsContent));
      }
      Object.assign(allModifyVars, modifyVars);

      const { css = {}, plugins = [] } = config;
      config.css = {
        preprocessorOptions: { javascriptEnabled: true, modifyVars: allModifyVars, ...preprocessorOptions },
        ...css,
      };

      plugins.push(
        vitePluginImp({
          libList: [
            ...libList,
            {
              libName: 'antd',
              style: (name) => {
                switch (name) {
                  case 'col':
                  case 'row':
                    return 'antd/es/grid/style/index.less';
                  case 'table':
                    return [
                      `antd/es/${name}/style/index.less`,
                      'antd/es/pagination/style/index.less',
                      'antd/es/dropdown/style/index.less',
                    ];
                  case 'popconfirm':
                    return [`antd/es/${name}/style/index.less`, 'antd/es/popover/style/index.less'];
                  default:
                    return `antd/es/${name}/style/index.less`;
                }
              },
            },
          ],
        })
      );
    },
  };
  return [plugin];
}
