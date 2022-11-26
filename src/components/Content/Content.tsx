import cn from 'classnames';
import { useQuery } from 'react-query';

import { getWeather } from '../../service/weather';
import styles from './Content.module.less';

interface ContentProps {
  className?: string;
}

export function Content(props: ContentProps) {
  const { className } = props;

  const { data, isLoading } = useQuery('getWeather', getWeather);

  return (
    <div className={cn(styles.Content, className)}>
      {!isLoading && data?.city}
    </div>
  );
}
