declare module '*.svg' {
  import React from 'react';
  const src: React.SFC<React.SVGProps<SVGSVGElement>>;
  export default src;
}
