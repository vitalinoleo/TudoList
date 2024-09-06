'use client'; // usando o use para rendenizar do lado do cliente 
//basicamente estou economizando os imports 



import { useState, useEffect } from 'react';


export default function Home() {   //criando a funcao home onde ela vai ter o todos e newtodos
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');


  useEffect(() => {
    fetchTodos(); // fetchTodos ele conecta na api todods e chama o metodo para fazer o get
  }, []);


  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data.data);
  };


  const addTodo = async () => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTodo }),
    });
    const data = await response.json();
    setTodos([...todos, data.data]);
    setNewTodo(''); // vai ser o campo do imput 
  };


  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };
  //put - update 
  const updateTodo = async (id, status) =>{
    const response = await fetch (`/api/todos/${id}`,{
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ completed:!status}),
    });
    await response.json();
    fetchTodos();
  }

// me retornando o conteudo em html
  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Adicionar Tarefa</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {/* colocando o concluido e pendente */}
            {todo.title} - {todo.completed?"concluido":"pendente"} 
            {/* colocando um check para clicar e saber se foi concluido */}
            <input type="checkbox" checked={todo.completed} onChange={()=>updateTodo(todo._id,todo.completed)}/>            
            {/* botao para excluir */}
            <button onClick={() => deleteTodo(todo._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
