import { defineStore } from 'pinia';
import createId from '@/lib/createId';

const useTagStore = defineStore('tagStore', () => {
  const localStorageKeyName = ref<string>('tagList');
  const tagList = ref<Tag[]>([]);
  const fetchTags = () => {
    tagList.value = JSON.parse(window.localStorage.getItem(localStorageKeyName.value) || '[]');
    return tagList.value;
  };
  const findTag = (id: string) => {
    return tagList.value.filter((t) => t.id === id)[0];
  };
  const createTag = (name: string) => {
    const names = tagList.value.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert('标签名重复了');
      return 'duplicated';
    }
    const id = createId().toString();
    tagList.value.push({ id, name });
    saveTags();
    window.alert('添加成功');
    return 'success';
  };
  const removeTag = (id: string) => {
    let index = -1;
    for (let i = 0; i < tagList.value.length; i++) {
      if (tagList.value[i].id === id) {
        index = i;
        break;
      }
    }
    tagList.value.splice(index, 1);
    saveTags();
    return true;
  };
  const updateTag = (id: string, name: string) => {
    const idList = tagList.value.map((item) => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = tagList.value.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = tagList.value.filter((item) => item.id === id)[0];
        tag.name = name;
        saveTags();
        return 'success';
      }
    } else {
      return 'not Found';
    }
  };
  const saveTags = () => {
    window.localStorage.setItem(localStorageKeyName.value, JSON.stringify(tagList.value));
  };
  onBeforeMount(() => fetchTags());

  return {
    localStorageKeyName,
    tagList,
    fetchTags,
    findTag,
    createTag,
    removeTag,
    updateTag,
    saveTags,
  };
});

export default useTagStore;
