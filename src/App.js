import { UsersProvider } from "./Components/UserContext";
import Homepage from "./Pages/Homepage";
function App() {
  return (
    <div className="App">
      <UsersProvider>
        <Homepage />
      </UsersProvider>
    </div>
  );
}

export default App;
