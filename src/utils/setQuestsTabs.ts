import { getQuestsTabs } from './getQuestsTabs';

export function setQuestsTabs(data: Object) {
  const questsTabs = getQuestsTabs();

  localStorage.setItem(
    'quests-tabs',
    JSON.stringify({
      ...questsTabs,
      ...data,
    })
  );
}
