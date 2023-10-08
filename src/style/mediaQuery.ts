const breakpoints = {
  mobile: 576,
  tablet: 768,
  notebook: 1024,
  desktop: 1200,
}; // 미디어 쿼리 분기점

const mq = {
  mobile: `@media (max-width: ${breakpoints.mobile}px)`,
  tablet: `@media (max-width: ${breakpoints.tablet}px)`,
  notebook: `@media (max-width: ${breakpoints.notebook}px)`,
  desktop: `@media (max-width: ${breakpoints.desktop}px)`,
};

export default mq;
