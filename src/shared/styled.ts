export const allowBasicProps = (prop: string) => ['children', 'className'].includes(prop) 
    || prop.startsWith('aria') 
    || prop.startsWith('data');