import { useDataFetch } from './useDataFetch.js'
import { act ,renderHook,screen} from '@testing-library/react';
import { rest, setupWorker } from "msw";
import { setupServer } from "msw/node";
import { QueryClient,QueryClientProvider } from "react-query";

//const worker = setupWorker(
const worker = setupServer(
  rest.get("/data", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 500,
        firstName: "John",
        lastName: "Maverick"
      })
    );
  })
);
/*
const queryClient = new QueryClient()
const queryWrapper = ({children}:QueryWrapperProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
*/
describe('useDataFetchのテスト', () => {
  const queryClient = new QueryClient()
  const queryWrapper = ({children}:QueryWrapperProps) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  ); 
  //beforeAll(() => worker.start());
  beforeAll(() => worker.listen());
  afterEach(() => {
    worker.resetHandlers();
    queryClient.clear();
  });
  afterAll(() => {
    worker.close()
    //queryClient.clear();
  });
  
  test("isLoading", () => {
    const { result } = renderHook(() => useDataFetch(), { wrapper: queryWrapper} );
    act(() => {
      console.log(result);
    });
  });
  test("isData", () => {
    const { result } = renderHook(() => useDataFetch(), { wrapper: queryWrapper} );
    act(() => {
      console.log(result);
    });
  });
});
