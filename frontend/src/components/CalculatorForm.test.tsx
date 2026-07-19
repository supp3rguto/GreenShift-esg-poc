import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalculatorForm from './CalculatorForm';

describe('CalculatorForm Component', () => {
  it('deve renderizar os inputs de energia, transporte e lixo', () => {
    render(<CalculatorForm onCalculate={jest.fn()} />);

    expect(screen.getByLabelText(/Energia/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Transporte/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Lixo/i)).toBeInTheDocument();
  });

  it('deve chamar a função onCalculate ao submeter o formulário', () => {
    const mockOnCalculate = jest.fn();
    render(<CalculatorForm onCalculate={jest.fn()} setIsLoading={jest.fn()} />);

    const button = screen.getByRole('button', { name: /Calcular/i });
    
    fireEvent.click(button);

    expect(mockOnCalculate).toHaveBeenCalledTimes(1);
  });
});
