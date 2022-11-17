import cn from 'classnames';
import React from 'react';

interface aboutProps {
  className?: string;
}

function About(props: aboutProps) {
  const { className } = props;

  return (
    <div className={cn(className, 'h-[200px] w-[300px] bg-[yellow]')}>
      121212121
    </div>
  );
}

export default About;
