interface LibItem {
  /**
   * library name
   */
  libName: string;
  /**
   * component style file path
   */
  style?: (name: string) => string | string[] | boolean;
  /**
   * default `es`
   */
  libDirectory?: string;
  /**
   * whether convert component name from camel to dash, default `true`
   */
  camel2DashComponentName?: boolean;
  /**
   * whether replace old import statement, default `command === 'build'`,
   * that means in vite serve default to `false`, in vite build default to `ture`
   */
  replaceOldImport?: boolean;
  /**
   * imported name formatter
   */
  nameFormatter?: (name: string, importedName: string) => string;
}
