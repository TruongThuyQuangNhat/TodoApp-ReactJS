import { useState, useEffect } from 'react'

function App() {
  const [edit, setEdit] = useState('');

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(["aaa","bbb"]);
  
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('cc')));
  },[]);
  
  

  const handleOnChange = (e)=>{
    setTodo(e.target.value)
  }

  const handleSubmit = () => {
    setTodos((pre)=>{
      if(edit !== ''){
        //Luc Edit
        const arr = pre.map((item, index)=>{
          if(index === edit){
            return todo;
          } else {
            return item
          }
          })
          localStorage.setItem('cc',JSON.stringify(arr))
        return [...arr]
      } else {
        //Luc Them Moi
        localStorage.setItem('cc',JSON.stringify([...pre, todo]))
        return [...pre, todo]
      }
      
    })
    setEdit('')
    setTodo('');
  }
  
  const handleEdit = (index)=>{
    setTodo(todos[index])
    setEdit(index);
  }
  const handleDelete = (index)=>{  
    setTodos((pre)=>{
      const arr = pre.filter((item, index2)=>{
        return index2 !== index
      })
      localStorage.setItem('cc',JSON.stringify(arr))
      return [...arr]
    })
  }
  return (
    <div className="App">
      <input type='text' onChange={handleOnChange} value ={todo}/>
      <button onClick={handleSubmit}>Thêm</button>
      <ul>
        {todos.map((item, index)=>{ return(
            <div key={index}>
              <li>{item}</li>
              <button onClick={() => handleEdit(index)}>edit</button>
              <button onClick={()=>handleDelete(index)}>delete</button>
            </div>
        )})}
      </ul>
    </div>
  );
}

export default App;


// import { useState, useEffect } from "react";
// import ReactDOM from "react-dom/client";

// function App() {
//   const [data, setData] = useState("");
//   const [a, setA] = useState(1);
//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/todos/'+a)
//     .then(response => response.json())
//     .then(json => setData(json))

//     setTimeout(() => {
//       setA((a) => a + 1);
//     }, 100);
//   },[a]);

//   return <pre>{JSON.stringify(data,null,2)}</pre>;
// }

// export default App;
