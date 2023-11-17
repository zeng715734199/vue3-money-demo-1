import { defineComponent } from 'vue';
import './style/Layout.scss';
import Nav from '@/components/Nav';
export default defineComponent({
  name: 'Nav',
  props: {
    classPrefix: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    // { emit, slots, expose, attrs }
    return () => (
      <div class={props.classPrefix && `${props.classPrefix}-wrapper layout-wrapper`}>
        <div class={props.classPrefix && `${props.classPrefix}-content content`}>
          {slots.default?.()}
        </div>
        <Nav />
      </div>
    );
  },
});
