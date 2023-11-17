import { defineComponent } from 'vue';
import '../style/Tags.scss';
import useTagStore from '@/store/modules/tagStore';
import useTagHelper from '@/mixins/TagHelper';

export default defineComponent({
  name: 'Nav',
  setup(props, { emit }) {
    const tagStore = useTagStore();
    const tagHelper = useTagHelper();
    const selectedTags: Tag[] = [];
    const tagList = computed(() => tagStore.tagList);
    onBeforeMount(() => tagStore.fetchTags());

    const toggle = (tag: Tag) => {
      const index = selectedTags.indexOf(tag);
      if (index >= 0) {
        selectedTags.splice(index, 1);
      } else {
        selectedTags.push(tag);
      }
      emit('update:value', selectedTags);
    };
    return () => (
      <div class="tags">
        <ul>
          {tagList.value.map((tag) => (
            <li
              onClick={() => toggle(tag)}
              class={{ selected: selectedTags.indexOf(tag) >= 0 }}
              key={tag.id}
            >
              {tag.name}
            </li>
          ))}
          <li onClick={() => tagHelper.createTag()} class="new">
            新增标签
          </li>
        </ul>
      </div>
    );
  },
});
