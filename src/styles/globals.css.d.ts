// Declaration file to allow TypeScript to recognize CSS side-effect imports.
// Required by 'noUncheckedSideEffectImports' + 'allowArbitraryExtensions'.
declare module '*.css' {
  const styles: Record<string, string>;
  export default styles;
}
