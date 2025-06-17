import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { IToDo, toDoState, categoriesState } from '../atoms';

const TodoItem = styled.li`
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    border-color: #4caf50;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const TodoContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const TodoText = styled.span`
  font-size: 18px;
  color: #1a1a1a;
  flex: 1;
  word-break: break-word;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ bgColor: string }>`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  background-color: ${(props) => props.bgColor};
  color: white;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 16px;
  background-color: #f0f0f0;
  border-radius: 12px;
  border: 2px dashed #ccc;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const getCategoryName = (catId: string) => {
    const category = categories.find((cat) => cat.id === catId);
    return category ? category.name : catId;
  };

  return (
    <TodoItem>
      <TodoContent>
        <TodoText>{text}</TodoText>
        <ButtonGroup>
          {categories.map((cat) => {
            if (cat.id === category) return null;
            return (
              <ActionButton
                key={cat.id}
                name={cat.id}
                onClick={onClick}
                bgColor={cat.color}
              >
                {getCategoryName(cat.id)}
              </ActionButton>
            );
          })}
        </ButtonGroup>
      </TodoContent>
    </TodoItem>
  );
}

export default ToDo;
