# vite-plugin-ant-design

<p align="center">
  <a href="https://www.npmjs.com/package/@mgcrea/vite-plugin-ant-design">
    <img src="https://img.shields.io/npm/v/@mgcrea/vite-plugin-ant-design.svg?style=for-the-badge" alt="npm version" />
  </a>
  <!-- <a href="https://www.npmjs.com/package/@mgcrea/vite-plugin-ant-design">
    <img src="https://img.shields.io/npm/dt/@mgcrea/vite-plugin-ant-design.svg?style=for-the-badge" alt="npm total downloads" />
  </a> -->
  <a href="https://www.npmjs.com/package/@mgcrea/vite-plugin-ant-design">
    <img src="https://img.shields.io/npm/dm/@mgcrea/vite-plugin-ant-design.svg?style=for-the-badge" alt="npm monthly downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@mgcrea/vite-plugin-ant-design">
    <img src="https://img.shields.io/npm/l/@mgcrea/vite-plugin-ant-design.svg?style=for-the-badge" alt="npm license" />
  </a>
  <a href="https://github.com/mgcrea/vite-plugin-linked-dependencies/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/workflow/status/mgcrea/vite-plugin-linked-dependencies/main?style=for-the-badge" alt="github main workflow" />
  </a>
</p>

Quick support for [AntDesign](https://ant.design) in your [Vite](https://vitejs.dev) project

## Features

- Properly loads Ant Design `.less` files along javascript imports using
  [vite-plugin-imp](https://github.com/onebay/vite-plugin-imp)
- Enables you to pass a less config file to modify Ant Design variables using
  [less-vars-to-js](https://github.com/michaeltaranto/less-vars-to-js)

## Install

```sh
npm install --save-dev @mgcrea/vite-plugin-ant-design
```

## Quickstart

```tsx
// vite.config.ts
import antDesignPlugin from '@mgcrea/vite-plugin-ant-design';

export default defineConfig({
  plugins: [
    antDesignPlugin({
      lessVarsFile: 'src/config/antd.less',
      modifyVars: {
        '@primary-color': '#1DA57A',
      },
    }),
  ],
});
```
