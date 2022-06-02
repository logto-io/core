import React, { HTMLProps } from 'react';

const ClearIcon = ({ className, onMouseDown }: HTMLProps<SVGSVGElement>) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseDown={onMouseDown}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM8.46447 9.87868C8.07394 9.48816 8.07394 8.85499 8.46447 8.46447C8.85499 8.07394 9.48816 8.07394 9.87868 8.46447L12 10.5858L14.1213 8.46447C14.5118 8.07394 15.145 8.07394 15.5355 8.46447C15.9261 8.85499 15.9261 9.48815 15.5355 9.87868L13.4142 12L15.5355 14.1213C15.9261 14.5118 15.9261 15.145 15.5355 15.5355C15.145 15.9261 14.5118 15.9261 14.1213 15.5355L12 13.4142L9.87868 15.5355C9.48816 15.9261 8.85499 15.9261 8.46447 15.5355C8.07394 15.145 8.07394 14.5118 8.46447 14.1213L10.5858 12L8.46447 9.87868Z"
        fill="currentcolor"
      />
    </svg>
  );
};

export default ClearIcon;
