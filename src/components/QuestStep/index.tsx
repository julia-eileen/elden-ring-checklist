import { ChangeEventHandler, useCallback, useState } from 'react';
import { IQuestStep } from '../../types/IQuest';
import CheckboxLabel from '../CheckboxLabel';
import QuestStepDetail from '../QuestStepDetail';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

import styles from './QuestStep.module.scss';

interface QuestStepProps extends IQuestStep {
  checked?: boolean;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
}

const QuestStep: React.FC<QuestStepProps> = (props) => {
  const { title, checked, onChangeHandler, description, mapLink } = props;
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible((v) => !v);
  }, []);

  const hasDetail = description || mapLink;

  const detailIcon = isVisible ? (
    <FaAngleUp onClick={toggleVisibility} />
  ) : (
    <FaAngleDown onClick={toggleVisibility} />
  );

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <CheckboxLabel>
          <input
            type='checkbox'
            checked={checked ?? false}
            onChange={onChangeHandler}
          />
          {title}
        </CheckboxLabel>
        {hasDetail ? detailIcon : null}
      </div>
      <QuestStepDetail
        isVisible={isVisible}
        description={description}
        mapLink={mapLink}
      />
    </div>
  );
};

export default QuestStep;
