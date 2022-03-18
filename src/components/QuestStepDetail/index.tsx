import styles from './QuestStepDetail.module.scss';
import { GrMapLocation } from 'react-icons/gr';

interface QuestStepDetailProps {
  description?: string;
  mapLink?: string;
  isVisible?: boolean;
}

const QuestStepDetail: React.FC<QuestStepDetailProps> = (props) => {
  const { isVisible, description, mapLink } = props;
  const classes = [styles.container];
  if (isVisible) classes.push(styles.visible);

  return (
    <div className={classes.join(' ')}>
      {!!description && <p>{description}</p>}
      {!!mapLink && (
        <a target='_blank' href={mapLink} rel='noreferrer noopener'>
          <GrMapLocation /> See on map
        </a>
      )}
    </div>
  );
};

export default QuestStepDetail;
