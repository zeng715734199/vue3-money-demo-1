import { defineComponent, PropType } from 'vue';
import './style/Tabs.scss';

export type DataSourceItem = { text: string; value: string };

export default defineComponent({
  name: 'Tabs',
  props: {
    dataSource: {
      type: Array as PropType<DataSourceItem[]>,
      default: () => [],
      required: true,
    },
    value: {
      type: String,
      default: '',
      required: true,
    },
    classPrefix: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const liClass = (item: DataSourceItem) => {
      return {
        [`${props.classPrefix}-tab-item`]: props.classPrefix,
        selected: item.value === props.value,
      };
    };
    const select = (item: DataSourceItem) => {
      emit('update:value', item.value);
    };
    return () => (
      <ul class={{ [`${props.classPrefix}-tabs`]: props.classPrefix }}>
        {props.dataSource.map((item) => (
          <li class={(item) => `${liClass(item)} liClass`} onClick={() => select(item)}></li>
        ))}
      </ul>
    );
  },
});
