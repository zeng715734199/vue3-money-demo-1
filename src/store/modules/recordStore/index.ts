import { defineStore } from 'pinia';
import clone from '@/lib/clone';

const useRecordStore = defineStore('recordStore', () => {
  const localStorageKeyName = ref<string>('recordList');
  const recordList = ref<RecordItem[]>([]);
  const fetchRecords = () => {
    recordList.value = JSON.parse(
      window.localStorage.getItem(localStorageKeyName.value) || '[]',
    ) as RecordItem[];
    return recordList.value;
  };
  const saveRecords = () => {
    window.localStorage.setItem(localStorageKeyName.value, JSON.stringify(recordList.value));
  };
  const createRecord = (record: RecordItem) => {
    const recordClone: RecordItem = clone(record);
    recordClone.createdAt = new Date().toISOString();
    recordList.value && recordList.value.push(recordClone);
    saveRecords();
  };

  onBeforeMount(() => fetchRecords());

  return {
    localStorageKeyName,
    recordList,
    fetchRecords,
    saveRecords,
    createRecord,
  };
});

export default useRecordStore;
