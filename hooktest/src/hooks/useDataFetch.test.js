import { useDataFetch } from './useDataFetch.js'
import { act ,renderHook,screen,waitFor} from '@testing-library/react';
import { rest, setupWorker } from "msw";
import { setupServer } from "msw/node";
import { QueryClient,QueryClientProvider } from "react-query";
import jsonFile from './file.json'
import jsonFile2 from './file2.json'

const worker = setupServer(
  rest.get("/data", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(jsonFile)
    );
  })
);

function create_dataworker(jsonfile_data) { 
  return setupServer(
    rest.get("/data", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(jsonfile_data)
      );
    })
)}


describe('useDataFetch test1', () => {
  const queryClient = new QueryClient()
  const queryWrapper = ({children}:QueryWrapperProps) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  ); 
  beforeAll(() => worker.listen());
  afterEach(() => {
    worker.resetHandlers();
    queryClient.clear();
  });
  afterAll(() => {
    worker.close()
  });
  
  test("fetch test",async () => {
    const { result } = renderHook(() => useDataFetch(), { wrapper: queryWrapper} );
    await waitFor( () => expect((result.current.isLoading)).toBe(false));
    console.log(result); 
  });
});


describe('useDataFetch test1', () => {
  const queryClient = new QueryClient()
  const queryWrapper = ({children}:QueryWrapperProps) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  ); 
  test("fetch test",async () => {
    var jsonfiledata = jsonFile2
    const worker = create_dataworker(jsonfiledata)
    worker.listen();
    const { result } = renderHook(() => useDataFetch(), { wrapper: queryWrapper} );
    await waitFor( () => expect((result.current.isLoading)).toBe(false));
    console.log(result); 
    worker.close()
  });
});
