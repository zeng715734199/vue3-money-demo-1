import { InjectionKey } from 'vue';
import dayjs from 'dayjs';
import _ from 'lodash';
import { nanoid } from 'nanoid';

export const $day: InjectionKey<typeof dayjs> = Symbol();
export const $_: InjectionKey<typeof _> = Symbol();
export const $id: InjectionKey<typeof nanoid> = Symbol();

export const useDayjs = () => inject<typeof dayjs>($day)!;
export const use_ = () => inject<typeof _>($_)!;
export const useNanoid = inject<typeof dayjs>($id)!;
