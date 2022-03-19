export function getQuestsTabs() {
  return JSON.parse(localStorage.getItem('quests-tabs') ?? '{}');
}
