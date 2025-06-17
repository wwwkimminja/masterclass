import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { categoryState, toDoSelector } from '../atoms';
import CreateToDo from './CreateToDo';
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
  color:#555;

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
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as any);
  };

  const getCategoryDisplayName = (cat: string) => {
    switch (cat) {
      case 'TO_DO':
        return 'To Do';
      case 'DOING':
        return 'Doing';
      case 'DONE':
        return 'Done';
      default:
        return cat;
    }
  };

  return (
    <Container>
      <Title>📝 To Do List</Title>

      <CategorySection>
        <CategoryLabel>Select Category:</CategoryLabel>
        <CategorySelect value={category} onInput={onInput}>
          <option value="TO_DO">📋 To Do</option>
          <option value="DOING">⏳ Doing</option>
          <option value="DONE">✅ Done</option>
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
