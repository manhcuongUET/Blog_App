
// chỉ có root module mới đc import core module
export function throwIfAppearMoreOneTime(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import ${moduleName} modules in the AppModule only.`
    );
  }
}
