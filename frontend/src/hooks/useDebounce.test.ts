import { renderHook, act } from '@testing-library/react-hooks';
import useDebounce from './useDebounce';

jest.useFakeTimers();

describe('useDebounce Hook', () => {
  it('deve atrasar a atualização do valor de acordo com o tempo fornecido', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'teste inicial', delay: 500 } }
    );

    expect(result.current).toBe('teste inicial');

    rerender({ value: 'teste atualizado', delay: 500 });

    expect(result.current).toBe('teste inicial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('teste atualizado');
  });
});