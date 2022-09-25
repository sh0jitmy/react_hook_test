import { useCounter } from './useCounter.js'
import { act ,renderHook} from '@testing-library/react';
//import { renderHook } from '@testing-library/react-hooks';

describe('useCounterのテスト', () => {
  beforeEach(() => {
  });

  test('increment関数を実行すると、countが1増える', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    console.log("count",result.current.count)    
    expect(result.current.count).toBe(1);
  });

  test('decrement関数を実行すると、countが1減る', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-1);
  });
});
