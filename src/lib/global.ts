import { InjectionKey } from 'vue';
import dayjs from 'dayjs';
import _ from 'lodash';
import { nanoid } from 'nanoid';

export const $Day: InjectionKey<typeof dayjs> = Symbol();
export const $_: InjectionKey<typeof _> = Symbol();
export const $Id: InjectionKey<typeof nanoid> = Symbol();

export const useDayjs = () => inject<typeof dayjs>($Day)!;
export const useLodash = () => inject<typeof _>($_)!;
export const useNanoid = inject<typeof dayjs>($Id)!;
