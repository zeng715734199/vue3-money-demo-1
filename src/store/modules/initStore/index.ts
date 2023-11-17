import { defineStore } from 'pinia';
import createId from '@/lib/createId';
import router from '@/router';
import clone from '@/lib/clone';
const useInitStore = defineStore('initStore', () => {
  const state = reactive<RootState>({
    recordList: [],
    createRecordError: null,
    createTagError: null,
    tagList: [],
    currentTag: undefined,
  } as RootState);

  const setCurrentTag = (id: string) => {
    state.currentTag = state.tagList.filter((t) => t.id === id)[0];
  };
  const updateTag = (payload: { id: string; name: string }) => {
    const { id, name } = payload;
    const idList = state.tagList.map((item) => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
      } else {
        const tag = state.tagList.filter((item) => item.id === id)[0];
        tag.name = name;
        saveTags();
      }
    }
  };

  const removeTag = (id: string) => {
    let index = -1;
    for (let i = 0; i < state.tagList.length; i++) {
      if (state.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      state.tagList.splice(index, 1);
      saveTags();
      router.back();
    } else {
      window.alert('删除失败');
    }
  };

  const fetchRecords = () => {
    state.recordList = JSON.parse(
      window.localStorage.getItem('recordList') || '[]',
    ) as RecordItem[];
  };
  const createRecord = (record: RecordItem) => {
    const record2 = clone(record);
    record2.createdAt = new Date().toISOString();
    state.recordList.push(record2);
    saveRecords();
  };
  const saveRecords = () => {
    window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
  };
  const fetchTags = () => {
    state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    if (!state.tagList || state.tagList.length === 0) {
      ['早餐', '中餐', '晚餐', '宵夜', '日用', '租房', '交通', '网购'].map((tag) => createTag(tag));
    }
  };
  const createTag = (name: string) => {
    state.createTagError = null;
    const names = state.tagList.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      state.createTagError = new Error('tag name duplicated');
      return;
    }
    const id = createId().toString();
    state.tagList.push({ id, name });
    saveTags();
  };
  const saveTags = () => {
    window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
  };

  return {
    state,
    setCurrentTag,
    updateTag,
    removeTag,
    fetchRecords,
    createRecord,
    saveRecords,
    fetchTags,
    createTag,
    saveTags,
  };
});

export default useInitStore;
