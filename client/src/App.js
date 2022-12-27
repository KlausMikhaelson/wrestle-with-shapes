import './App.css';
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001")

function App() {

  const send_message = () => {
    socket.emit()
  }

  return (
    <div className="App">
      <button onClick={send_message()}>Hello WOrld</button>
    </div>
  );
}

export default App;
