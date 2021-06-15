import {
  Home,
  GroupSelect,
} from 'containers';

import { v1 } from 'uuid';

export const initialRouteKey = 'home';

export const ROUTES = {
  home: {
    title: 'Расписание занятий',
    component: Home,
    key: 'home',
  },
  groupSelect: {
    title: '',
    component: GroupSelect,
    key: 'groupSelect',
  }
};

export const getRoute = (key, params = {}) => (
  { ...ROUTES[key], params, uniqKey: v1() }
);
