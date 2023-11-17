import { defineComponent } from 'vue';
import useStore from '@/store';
import Button from '@/components/Button';
import useTagHelper from '@/mixins/TagHelper';
import Layout from '@/components/Layout';
import './style/index.scss';

export default defineComponent({
  name: 'Labels',
  setup() {
    const { InitStore } = useStore();
    const { createTag } = useTagHelper();
    const tags = computed(() => InitStore.state.tagList);
    onBeforeMount(() => InitStore.fetchTags());
    return () => (
      <Layout>
        <div class="tags">
          {tags.value.map((tag) => (
            <router-link class="tag" key={tag.id} to={`/labels/edit/${tag.id}`}>
              <span>{tag.name}</span>
              <span>Right</span>
            </router-link>
          ))}
        </div>
        <div class="createTag-wrapper">
          <Button class="createTag" onClick={() => createTag()}>
            新建标签
          </Button>
        </div>
      </Layout>
    );
  },
});
