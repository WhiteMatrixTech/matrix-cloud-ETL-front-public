import cn from 'classnames';

import styles from './index.module.less';

interface aboutProps {
  className?: string;
}

function About(props: aboutProps) {
  const { className } = props;

  return <div className={cn(styles.about, className)}>about</div>;
}

export default About;
