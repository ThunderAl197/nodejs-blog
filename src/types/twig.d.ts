declare module '*.twig' {
    const template: (...args: any) => string
    export default template
}