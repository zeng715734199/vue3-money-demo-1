import useTagStore from '@/store/modules/tagStore';
import useInitStore from '@/store/modules/initStore';

const useTagHelper = () => {
  const createTag = () => {
    const tagStore = useTagStore();
    const initStore = useInitStore();
    const map: { [key: string]: string } = {
      'tag name duplicated': '标签名重复了',
    };

    const name = window.prompt('请输入标签名');
    if (!name) {
      return window.alert('标签名不能为空');
    }
    tagStore.createTag(name);
    if (initStore.state.createTagError) {
      window.alert(map[initStore.state.createTagError.message] || '未知错误');
    }
  };

  return {
    createTag,
  };
};

export default useTagHelper;
