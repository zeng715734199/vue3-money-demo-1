import { defineComponent } from 'vue';
import { useLodash, useDayjs } from '@/lib/global';
import useStore from '@/store';
import recordTypeArr from '@/constants/recordTypeList';
import Layout from '@/components/Layout';
import Tabs from '@/components/Tabs';
import clone from '@/lib/clone';
export default defineComponent({
  name: 'Statistics',
  setup() {
    const { InitStore, RecordStore } = useStore();
    const _ = useLodash();
    const dayjs = useDayjs();
    const type = '-';
    const recordTypeList = recordTypeArr;
    onMounted(() => console.log(dayjs, '______'));
    const tagString = (tags: Tag[]) => {
      return tags.length === 0 ? '无' : tags.map((t) => t.name).join('，');
    };

    const beautify = (string: string) => {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    };

    const recordList = computed(() => {
      return (InitStore.state as RootState).recordList;
    });

    const groupedList = computed(() => {
      const newList = clone(recordList.value)
        .filter((r) => r.type === type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {
        return [];
      }
      type Result = { title: string; total?: number; items: RecordItem[] }[];
      const result: Result = [
        {
          title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'),
          items: [newList[0]],
        },
      ];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({ title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current] });
        }
      }
      result.map((group) => {
        group.total = group.items.reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
      });
      return result;
    });

    onBeforeMount(() => RecordStore.fetchRecords());

    return () => (
      <Layout>
        <Tabs class-prefix="type" data-source={recordTypeList} v-model={[type, 'value']} />
        {groupedList.value.length > 0 ? (
          <ol>
            {groupedList.value.map((group, index) => {
              <li key={index}>
                <h3 class="title">
                  <span class="date">{beautify(group.title)}</span>
                  <span class="expense">￥{group.total}</span>
                </h3>
                <ol>
                  {group.items.map((item, index) => (
                    <li key={index} class="record">
                      <span>{tagString(item.tags)}</span>
                      <span class="notes">{item.notes}</span>
                      <span>￥{item.amount}</span>
                    </li>
                  ))}
                </ol>
              </li>;
            })}
          </ol>
        ) : (
          <div class="noResult">目前没有相关记录</div>
        )}
      </Layout>
    );
  },
});
