import "./App.less";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import Input from "./components/Input";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";


function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  const [file, setFile] = useState("");


  const [titleEd, setTitleEd] = useState("");
  const [textEd, setTextEd] = useState("");
  const [dataEd, setDataEd] = useState("");
  /**Read todos from firebase */
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((item) => {
        todosArr.push({ ...item.data(), id: item.id });
      });
      setTodos(todosArr);
    });
    return () => unsub();
  }, []);
  /**Add todo to firebase */
  const addTodo = async ()=>{
      await addDoc(collection(db,"todos"),{
        title: title,
        text: text,
        data: data,
        file: file,
        isCompleted: false,
        isEditting: false,
      })
      setTitle("");
      setText("");
      setData("");
      setFile("");
  }
 /** Updates complited status in firebase
  * @param {todo} * accepts todo
 */
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id),
      {
        isCompleted: !todo.isCompleted,
      })
  };
  /** Shows and hides edit modal */
  const editTodo = async (todo)=>{
    await updateDoc(doc(db, "todos", todo.id),{
      isEditting: !todo.isEditting
    })
    
  }
  /** Update todo in firebase */
  const saveEdit = async (todo)=>{
    await updateDoc(doc(db, "todos", todo.id),{
          title : titleEd,
          text : textEd,
          data : dataEd
    })
    
  }
  /** Remove todo in firebase */
  const removeTodo = async(id)=>{
    await deleteDoc(doc(db, "todos", id))
  }

  return (
    <div className="App">
      <Input
        setTitle={setTitle}
        setText={setText}
        addTodo={addTodo}
        setData={setData}
        setFile={setFile}
        title={title}
        text={text}
        data={data}
        file={file}
      />
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
            isCompleted={todo.isCompleted}
            isEditting={todo.isEditting}
            editTodo={editTodo}
            setTitle={setTitle}
            setText={setText}
            setDataEd={setDataEd}
            setTextEd={setTextEd}
            setTitleEd={setTitleEd}
            saveEdit={saveEdit}
            todo={todo}
            {...todo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
