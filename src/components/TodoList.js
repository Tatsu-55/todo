import {useState, useEffect} from 'react';
import {db} from '../Firebase';
import {collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import {useAuthContext} from '../context/AuthContext';
import TodoItem from './TodoItem';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


export default function TodoList() {

    const [todos, setTodos] = useState([]);
    const { user } = useAuthContext();

//Todoを取得する
useEffect(() => {

const uid = user ? user.uid : null;

if (!uid) {
    setTodos([]);
    return;
}
const q = query(collection(db, 'todos'),
 where( 'userId', '==', uid ), 
orderBy('createdAt','desc')
);

const unSub = onSnapshot(q, async (snapshot) => {
    setTodos(
        snapshot.docs.map((doc) => ({
            userId: doc.data().userId,
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
}, [user]);

const listcontainer = css`
text-align: center;
`

//Todoを表示する
return(
    <div css={listcontainer}>
    {todos[0]?.id && (
        <Grid container spacing={3} sx={{textAlign:"center"}}>
            <Grid xs={3}></Grid>
            <Grid xs={6} sx={{justifyContent:"center"}}>
        <Box>
         <List sx={{textAlign:"center"}}>
        {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
        ))}
         </List>
        </Box>
        </Grid>
        <Grid xs={3}></Grid>
        </Grid>
    )}
    </div>
);
};

