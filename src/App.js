import { QueryClient, QueryClientProvider } from "react-query";
import Homepage from "./Pages/Homepage";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="App fixed inset-0 bg-blue-500 ">
      <QueryClientProvider client={queryClient}>
        <Homepage />
        {/* <ReactQueryDevTools /> */}
      </QueryClientProvider>
    </div>
  );
}

export default App;
