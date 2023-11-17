import { InjectionKey } from 'vue';
import dayjs from 'dayjs';
import _ from 'lodash-es';
import { nanoid } from 'nanoid';

export const $day = Symbol();
export const $_ = Symbol();
export const $id = Symbol();

export const useDayjs = () => inject<InjectionKey<typeof dayjs>>($day);
export const use_ = () => inject<InjectionKey<typeof _>>($_);
export const useNanoid = inject<InjectionKey<typeof nanoid>>($id);
