import {useState, useEffect, useRef} from 'react';
import {db} from '../Firebase';
import {doc, getDoc, updateDoc, deleteDoc, serverTimestamp} from 'firebase/firestore';
import UpdateIcon from '@mui/icons-material/Update';
import {useAuthContext} from '../context/AuthContext';

//MUI
import { Button, Stack, TextField } from '@mui/material'
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


//Todoを表示する
export default function TodoItem(props) {
const {id, text, timestamp } = props.todo;
const { user } = useAuthContext();

const [update, setUpdate] = useState('');
const [isEdit, setIsEdit] = useState(false);
const [date, setDate] = useState(formatTimestamp(timestamp));
console.log(date);

const updateInput = useRef(null);
const liRef = useRef(null);

//選択したアイテム＝DOM要素にフォーカスをあてる
useEffect(() => {
    const refInput = updateInput.current;
    if (isEdit === true) {
        if(refInput === null) return;
        refInput?.focus();
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    }

}, [isEdit]);

//Todoを更新する
const onSubmitUpdate = async (e) => {
    e.preventDefault();
    updateItem(id);
};

const updateItem = async ( id ) => {
    if (update.trim() === '') return;
    try {
    await updateDoc(doc(db, 'todos', id), {
        userId: user.uid,
        text: update,
        createdAt: serverTimestamp(),
    });

    const docSnap = await getDoc(doc(db,'todos', id));
    console.log(docSnap);
    const updatedTimestamp = docSnap.data().createdAt;
      setDate(formatTimestamp(updatedTimestamp));

    setIsEdit(false);
  } catch (error) {
    console.error("Error updating document: ", error);
};
};

//Todoを削除する
const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
};

//Todoを編集から表示に切り替える
const handleClickOutside = (e) => {
    if (liRef.current.contains(e.target)) return;
    setIsEdit(false);
}
//timestampのformat
function formatTimestamp(timestamp) {
if (timestamp && timestamp.toDate) {
    const dateObj = timestamp.toDate();
    const dateStr = dateObj.toDateString();
    const timeStr = dateObj.toLocaleTimeString();
    return `${dateStr} ${timeStr}`;
} else {
  return 'New To-do Added!';
}}

//css
const todoItem = css`
    marginTop: 20px auto;
    list-style: none;
    width: 70%;
    display: flex;
    justify-content: center;
`
//console.log(createdAt.toDate())

const TodoListItem = () => {

    return(
        <>
                <ListItem 
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={text}
                    secondary={date}
                  />
                  <UpdateIcon />
                </ListItem>        
                </>
                )

}

//Todoを表示する
return(
    <li ref={liRef} css={todoItem} >
    {isEdit === false ? (
        <div  onDoubleClick={() => setIsEdit(true)}>
     <TodoListItem onDoubleClick={() => setIsEdit(true)} />
     </div>
    ) : (
        <div>
        <Stack component="form" onSubmit={onSubmitUpdate} spacing={2} direction='column' sx={{alignItems: 'center'}}>
        <TextField 
              type="text" 
              placeholder={text} 
              ref={updateInput} 
              onChange={(e) => setUpdate(e.target.value)}
              />
        <Button type="submit" variant="outlined" size="small" sx={{width: '15px', justifyContent: 'center'}}>Update</Button>
        </Stack>
        </div>
    )}
    </li>
);
};




