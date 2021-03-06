const QuoteIcon = ({
  className = '',
  size = '16px',
  title = 'Quote',
}) => (
  <svg
    className={className}
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    width={size}
    height={size}
    viewBox='0 0 48 48'
    xmlSpace='preserve'
    aria-label={title}
  >
    <g>
      <path d='M 16.67 3 L 6 3 C 2.69 3 0 6.03 0 9.75 L 0 20.25 C 0 23.97 2.69 27 6 27 L 10.67 27 L 10.67 27.75 C 10.67 29.82 9.18 31.5 7.33 31.5 L 6.67 31.5 C 4.46 31.5 2.67 33.52 2.67 36 L 2.67 40.5 C 2.67 42.98 4.46 45 6.67 45 L 7.33 45 C 15.79 45 22.67 37.27 22.67 27.75 L 22.67 9.75 C 22.67 6.03 19.98 3 16.67 3 Z M 18.67 27.75 C 18.67 34.78 13.58 40.5 7.33 40.5 L 6.67 40.5 L 6.67 36 L 7.33 36 C 11.38 36 14.67 32.3 14.67 27.75 L 14.67 22.5 L 6 22.5 C 4.9 22.5 4 21.49 4 20.25 L 4 9.75 C 4 8.51 4.9 7.5 6 7.5 L 16.67 7.5 C 17.77 7.5 18.67 8.51 18.67 9.75 Z M 42 3 L 31.33 3 C 28.02 3 25.33 6.03 25.33 9.75 L 25.33 20.25 C 25.33 23.97 28.02 27 31.33 27 L 36 27 L 36 27.75 C 36 29.82 34.51 31.5 32.67 31.5 L 32 31.5 C 29.79 31.5 28 33.52 28 36 L 28 40.5 C 28 42.98 29.79 45 32 45 L 32.67 45 C 41.13 45 48 37.27 48 27.75 L 48 9.75 C 48 6.03 45.31 3 42 3 Z M 44 27.75 C 44 34.78 38.92 40.5 32.67 40.5 L 32 40.5 L 32 36 L 32.67 36 C 36.71 36 40 32.3 40 27.75 L 40 22.5 L 31.33 22.5 C 30.23 22.5 29.33 21.49 29.33 20.25 L 29.33 9.75 C 29.33 8.51 30.23 7.5 31.33 7.5 L 42 7.5 C 43.1 7.5 44 8.51 44 9.75 Z M 44 27.75' />
    </g>
  </svg>
)

export default QuoteIcon