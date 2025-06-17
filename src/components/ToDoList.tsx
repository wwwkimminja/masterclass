import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { categoryState, toDoSelector, categoriesState } from '../atoms';
import CreateToDo from './CreateToDo';
import CreateCategory from './CreateCategory';
import ToDo from './ToDo';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 30px;
  font-size: 2.5rem;
`;

const CategorySection = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const CategoryLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`;

const CategorySelect = styled.select`
  padding: 10px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  color: #555;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const TodoCount = styled.div`
  text-align: center;
  margin: 20px 0;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  color: #666;
  font-weight: bold;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoriesState);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value);
  };

  const getCategoryDisplayName = (catId: string) => {
    const category = categories.find((cat) => cat.id === catId);
    return category ? category.name : catId;
  };

  return (
    <Container>
      <Title>📝 To Do List</Title>

      <CreateCategory />

      <CategorySection>
        <CategoryLabel>Select Category:</CategoryLabel>
        <CategorySelect value={category} onInput={onInput}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </CategorySelect>
      </CategorySection>

      <TodoCount>
        {getCategoryDisplayName(category)}: {toDos.length} items
      </TodoCount>

      <CreateToDo />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </Container>
  );
}

export default ToDoList;
