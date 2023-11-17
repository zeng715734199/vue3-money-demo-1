import { defineComponent } from 'vue';
import Tabs from '@/components/Tabs';
import Tags from '@/components/widgets/Tags';
import FormItem from '@/components/widgets/FormItem';
import NumberPad from '@/components/widgets/NumberPad';
import Layout from '@/components/Layout';
import useRecordStore from '@/store/modules/recordStore';
import recordTypeArr from '@/constants/recordTypeList';
// import stores from '@/store';
import useInitStore from '@/store/modules/initStore';
export default defineComponent({
  name: 'Money',
  setup() {
    const recordStore = useRecordStore();
    const initStore = useInitStore();
    // const recordList = computed(() => {
    //   return recordStore.recordList;
    // });

    // console.log(stores, 'sss');
    const recordTypeList = ref(recordTypeArr);

    const record = ref<RecordItem>({
      tags: [],
      notes: '',
      type: '-',
      amount: 0,
    });

    onBeforeMount(() => recordStore.fetchRecords());

    // const onUpdateNotes = (value: string) => {
    //   record.value.notes = value;
    // };

    const saveRecord = () => {
      if (!record.value.tags || record.value.tags.length === 0) {
        return window.alert('请至少选择一个标签');
      }
      recordStore.createRecord(record.value);
      if (initStore.state.createRecordError === null) {
        window.alert('已保存');
        record.value.notes = '';
      }
    };

    return () => (
      <Layout class-prefix="layout">
        <Tabs data-source={recordTypeList.value} value={record.value.type} />
        <Tags {...{ ['onUpdate:value']: ($event) => (record.value.tags = $event) }} />
        <FormItem
          field-name="备注："
          placeholder="在这里输入备注"
          v-model:value={record.value.notes}
        />
        <NumberPad v-model={[record.value.amount, 'value']} onSubmit={() => saveRecord()} />
      </Layout>
    );
  },
});
