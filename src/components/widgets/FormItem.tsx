import { defineComponent } from 'vue';
import '../style/FormItem.scss';

export default defineComponent({
  props: {
    value: {
      type: String,
      default: '',
      required: true,
      readonly: true,
    },
    fieldName: {
      type: String,
      default: '',
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
      required: false,
    },
  },
  setup(props, { emit }) {
    const onValueChanged = (value: string) => {
      emit('update:value', value);
    };
    return () => (
      <label class="notes">
        <span class="name">{props.fieldName}</span>
        <input
          type="text"
          value={props.value}
          onInput={(e: InputEvent) => onValueChanged((e.target as HTMLInputElement).value)}
          placeholder={props.placeholder}
        />
      </label>
    );
  },
});
