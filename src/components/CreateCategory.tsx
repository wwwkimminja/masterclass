import { useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { categoriesState, ICategory } from '../atoms';

const Container = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 2px solid #e0e0e0;
`;

const Title = styled.h3`
  margin: 0 0 15px 0;
  color: #555;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 150px;
  padding: 10px 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  color: #1a1a1a;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const ColorInput = styled.input`
  width: 50px;
  height: 40px;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`;

const predefinedColors = [
  '#FF6B6B',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E9',
];

function CreateCategory() {
  const setCategories = useSetRecoilState(categoriesState);
  const [categoryName, setCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError('Category name is required');
      return;
    }

    if (categoryName.length < 2) {
      setError('Category name must be at least 2 characters');
      return;
    }

    const newCategory: ICategory = {
      id: `CUSTOM_${Date.now()}`,
      name: categoryName.trim(),
      color: selectedColor,
    };

    setCategories((prev) => [...prev, newCategory]);
    setCategoryName('');
    setSelectedColor('#FF6B6B');
    setError('');
  };

  return (
    <Container>
      <Title>🎨 Create Custom Category</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Category name..."
          value={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value);
            setError('');
          }}
        />
        <ColorInput
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          title="Choose color"
        />
        <AddButton type="submit" disabled={!categoryName.trim()}>
          Add Category
        </AddButton>
      </Form>
      {error && <ErrorMessage> {error}</ErrorMessage>}

      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
          Quick color picker:
        </div>
        <div
          style={{
            display: 'flex',
            gap: '5px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {predefinedColors.map((color) => (
            <div
              key={color}
              style={{
                width: '25px',
                height: '25px',
                backgroundColor: color,
                borderRadius: '50%',
                cursor: 'pointer',
                border:
                  selectedColor === color ? '3px solid #333' : '2px solid #ddd',
              }}
              onClick={() => setSelectedColor(color)}
              title={color}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default CreateCategory;
