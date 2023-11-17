import { defineComponent } from 'vue';
import './style/Button.scss';
export default defineComponent({
  name: 'Button',
  setup(props, { emit, slots }) {
    return () => (
      <button class="button" onClick={($event) => emit('click', $event)}>
        {slots.default?.()}
      </button>
    );
  },
});
