import {useState, useEffect} from 'react';
import {db} from '../Firebase';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import TodoItem from './TodoItem';
import List from '@mui/material/List';

export default function TodoList() {

    const [todos, setTodos] = useState([{id:'', text:'', timestamp: null},]);

//Todoを取得する
useEffect(() => {
const q = query(collection(db, 'todos'), orderBy('createdAt','desc'));
const unSub = onSnapshot(q, async (snapshot) => {
    setTodos(
        snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text,
            timestamp: doc.data().createdAt,
        }))
    );
});

//Todoを削除する
return () => {
    unSub();
};
}, []);

//Todoを表示する
return(
    <div className='todo-list-container'>
    {todos[0]?.id && (
        <List>
        {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
        ))}
        </List>
    )}
    </div>
);
};

