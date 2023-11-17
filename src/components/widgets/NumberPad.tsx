import { defineComponent } from 'vue';
import '../style/NumberPad.scss';

export default defineComponent({
  name: 'NumberPad',
  props: {
    value: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  setup(props, { emit }) {
    const output = ref<string>(props.value.toString());
    const inputContent = (event: MouseEvent) => {
      const button = event.target as HTMLButtonElement;
      const input = button.textContent!;
      if (output.value.length === 16) {
        return;
      }
      if (output.value === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          output.value = input;
        } else {
          output.value += input;
        }
        return;
      }
      if (output.value.indexOf('.') >= 0 && input === '.') {
        return;
      }
      output.value += input;
    };

    const remove = () => {
      if (output.value.length === 1) {
        output.value = '0';
      } else {
        output.value = output.value.slice(0, -1);
      }
    };

    const clear = () => {
      output.value = '0';
    };

    const ok = () => {
      const number = parseFloat(output.value);
      emit('update:value', number);
      emit('submit', number);
      output.value = '0';
    };

    const numberPadMap = computed(() => [
      {
        label: '清空',
        class: 'empty',
        handler: () => clear(),
      },
      {
        label: output.value,
        class: 'output',
        handler: () => {
          console.log(1);
        },
      },
      {
        label: '1',
        handler: (e) => inputContent(e),
      },
      {
        label: '2',
        handler: (e) => inputContent(e),
      },
      {
        label: '3',
        handler: (e) => inputContent(e),
      },
      {
        label: 'OK',
        class: 'ok',
        handler: () => ok(),
      },
      {
        label: '4',
        handler: (e) => inputContent(e),
      },
      {
        label: '5',
        handler: (e) => inputContent(e),
      },
      {
        label: '6',
        handler: (e) => inputContent(e),
      },
      {
        label: '7',
        handler: (e) => inputContent(e),
      },
      {
        label: '8',
        handler: (e) => inputContent(e),
      },
      {
        label: '9',
        handler: (e) => inputContent(e),
      },
      {
        label: '.',
        handler: (e) => inputContent(e),
      },
      {
        label: '0',
        class: 'zero',
        handler: (e) => inputContent(e),
      },
      {
        label: '删除',
        handler: () => remove(),
      },
    ]);

    return () => (
      <div class="numberPad">
        <div class="buttons">
          {numberPadMap.value.map((item) => (
            <button onClick={item.handler} class={item.class ? item.class : null}>
              {item.class !== 'output' ? <span>{item.label}</span> : item.label}
            </button>
          ))}
        </div>
      </div>
    );
  },
});
