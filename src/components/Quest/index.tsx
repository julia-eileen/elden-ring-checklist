import { useMount } from '@vortigo/react-hooks';
import { useCallback, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { IQuest } from '../../types/IQuest';
import { getQuestsTabs } from '../../utils/getQuestsTabs';
import { setQuestsTabs } from '../../utils/setQuestsTabs';
import QuestStep from '../QuestStep';
import QuestTitle from '../QuestTitle';

import styles from './Quest.module.scss';

interface QuestProps {
  quest: IQuest;
  stepChecklist: boolean[];
  questIndex: number;
  onChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    questIndex: number,
    stepIndex: number
  ) => void;
}

const Quest: React.FC<QuestProps> = (props) => {
  const { quest, stepChecklist, onChangeHandler, questIndex } = props;
  const [isStepsVisible, setStepsVisibility] = useState(false);

  useMount(() => {
    const questsTabs = getQuestsTabs();
    const questTabVisibility = questsTabs[quest.questTitle];
    if (questTabVisibility) setStepsVisibility(questTabVisibility);
  });

  const toggleStepsVisibility = useCallback(() => {
    setStepsVisibility((v) => {
      setQuestsTabs({ [quest.questTitle]: !v });
      return !v;
    });
  }, [quest.questTitle]);

  const stepsClasses = [styles.stepsContainer];
  if (isStepsVisible) stepsClasses.push(styles.visible);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <QuestTitle>{quest.questTitle}</QuestTitle>
        {isStepsVisible ? (
          <FaAngleUp onClick={toggleStepsVisibility} />
        ) : (
          <FaAngleDown onClick={toggleStepsVisibility} />
        )}
      </div>
      <div className={stepsClasses.join(' ')}>
        {quest.steps.map((step, stepIndex) => (
          <QuestStep
            description={step.description}
            mapLink={step.mapLink}
            title={step.title}
            checked={stepChecklist[stepIndex] ?? false}
            key={step.title}
            onChangeHandler={(e) => onChangeHandler(e, questIndex, stepIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default Quest;
