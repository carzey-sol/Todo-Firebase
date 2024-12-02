import { useState, useEffect } from 'react';
import './App.css';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { db } from './firebase_config';
import { collection, addDoc, doc, serverTimestamp, updateDoc, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore';  // Import necessary Firestore functions

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([])

  const toggleTodoStatus = async (id, currentStatus) => {
    const todoDocRef = doc(db, "todo", id); // Reference the specific document by its ID
    try {
      await updateDoc(todoDocRef, {
        inprogress: !currentStatus, // Toggle the status
      });
      // Optionally refresh the todos list
      getTodos(); // Re-fetch todos to reflect the change in the UI
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    // Use the collection function and addDoc to add data to Firestore
    try {
      await addDoc(collection(db, "todo"), {
        inprogress: true,
        timestamp: serverTimestamp(),
        todo: todoInput,
      });
      setTodoInput("");  // Clear input after adding the todo
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
const deleteTodo = async (id) =>{
  const todosCollectionRef = doc(db, 'todo', id);
  await deleteDoc(todosCollectionRef)
}


const getTodos = async (e) => {
    const todosCollectionRef = collection(db, 'todo');
    const querySnapshot = await getDocs(todosCollectionRef);
    const todoList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      todo: doc.data().todo,
      inprogress: doc.data().inprogress,
      timestamp: doc.data().timestamp,
    }))
    setTodos(todoList)

  }
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todo"), (snapshot) => {
      const todoList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      getTodos();
    });
    
    return () => unsubscribe();
  }, [])





  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <h1>Mukesh Bajgain's Todo App 🔥</h1>
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <form>
          <TextField
            id="standard-basic"
            label="Add Todo"
            variant="standard"
            value={todoInput}  // Bind the input value
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <Button type='submit' variant="contained" onClick={addTodo}>Add Todo</Button>
        </form>
      </div>
      {todos.map((todos) => (
        <div style={{
        display: 'flex',
        gap: '100px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEFAE3',
        padding: '10px',
        marginTop: '10px',
        borderRadius: '10px'

      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',


        }}>
          <p style={{
            fontWeight: 'bold'
          }}>{todos.todo}</p>
          <p style={{
            marginTop: '-20px',
            fontSize: '10px'
          }}>{todos.inprogress ? 'InProgress' : 'Completed' }</p>
        </div>
        <div>
          <Button onClick={() => toggleTodoStatus(todos.id, todos.inprogress)} >{todos.inprogress ? 'DONE' : 'UNDONE' } </Button>
          <Button variant="outlined" onClick={() => deleteTodo(todos.id)} >X</Button>

        </div>
      </div>



     ))}
      

    </div>
  );
}


export default App;
