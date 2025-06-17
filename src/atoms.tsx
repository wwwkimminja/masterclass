import { atom, selector } from 'recoil';

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export interface ICategory {
  id: string;
  name: string;
  color: string;
}

export const categoriesState = atom<ICategory[]>({
  key: 'categories',
  default: [
    { id: 'TO_DO', name: 'To Do', color: '#6c757d' },
    { id: 'DOING', name: 'Doing', color: '#007bff' },
    { id: 'DONE', name: 'Done', color: '#28a745' },
  ],
});

export const categoryState = atom<string>({
  key: 'category',
  default: 'TO_DO',
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
