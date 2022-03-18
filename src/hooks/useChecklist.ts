import { useMount } from '@vortigo/react-hooks';
import { ChangeEvent, useCallback, useState } from 'react';
import { IQuest } from '../types/IQuest';

export function useChecklist(quests: IQuest[]) {
  const [checklist, setChecklist] = useState<boolean[][]>(
    quests.map((quest) => [...quest.steps.map(() => false)])
  );

  useMount(() => {
    const rawChecklist = localStorage.getItem('checklist');

    if (rawChecklist) {
      const parsedChecklist = JSON.parse(rawChecklist);
      setChecklist(parsedChecklist);
    }
  });

  const onChangeHandler = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      questIndex: number,
      stepIndex: number
    ) => {
      setChecklist((c: any) => {
        const current = [...c];
        current[questIndex][stepIndex] = e.target.checked;
        localStorage.setItem('checklist', JSON.stringify(current));
        return current;
      });
    },
    []
  );

  return { onChangeHandler, checklist };
}
