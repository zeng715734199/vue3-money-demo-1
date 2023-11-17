import useInitStore from '@/store/modules/initStore';
import useRecordStore from '@/store/modules/recordStore';
import useTagStore from '@/store/modules/tagStore';

function useStore() {
  return { TagStore: useTagStore(), InitStore: useInitStore(), RecordStore: useRecordStore() };
}

export const NativeStore = { useTagStore, useRecordStore, useInitStore };

export default useStore;
