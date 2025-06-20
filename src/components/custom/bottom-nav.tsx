import { memo, SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 466 84"
    fill="none"
    {...props}
  >
    <path
      className="fill-muted"
      d="M466 54c0 16.569-13.431 30-30 30H30C13.431 84 0 70.569 0 54V30C0 13.431 13.431 0 30 0h112c16.569 0 29.382 14.21 37.218 28.81C189.504 47.97 209.73 61 233 61c23.27 0 43.496-13.03 53.782-32.19C294.618 14.21 307.431 0 324 0h112c16.569 0 30 13.431 30 30v24Z"
    />
  </svg>
);
const BottomNav = memo(SvgComponent);
export default BottomNav;
