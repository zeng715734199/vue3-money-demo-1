import { defineComponent } from 'vue';
import './style/Nav.scss';
export default defineComponent({
  name: 'Nav',
  setup() {
    return () => (
      <nav>
        <router-link to="/labels" className="item" active-class="selected">
          【label】 标签
        </router-link>
        <router-link to="/money" className="item" active-class="selected">
          【money】 记账
        </router-link>
        <router-link to="/statistics" className="item" active-class="selected">
          【statistics】 统计
        </router-link>
      </nav>
    );
  },
});
