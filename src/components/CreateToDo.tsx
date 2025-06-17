import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';

interface IForm {
  toDo: string;
}

const FormContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  border: 2px solid #e0e0e0;
`;

const FormTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #1a1a1a;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  color: #1a1a1a;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }

  &::placeholder {
    color: #666;
  }
`;

const AddButton = styled.button`
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: 'TO_DO' },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };

  return (
    <FormContainer>
      <FormTitle>➕ To Do List</FormTitle>
      <Form onSubmit={handleSubmit(handleValid)}>
        <Input
          {...register('toDo', {
            required: 'write a to do',
            minLength: {
              value: 2,
              message: 'write at least 2 characters',
            },
          })}
          placeholder="ex: exercise, study, shopping..."
        />
        <AddButton type="submit">Add</AddButton>
      </Form>
      {errors.toDo && <ErrorMessage>⚠️ {errors.toDo.message}</ErrorMessage>}
    </FormContainer>
  );
}

export default CreateToDo;
