import React, {useContext} from 'react';
import {Priority, priorityStringArr, TodoListContext} from "./TodoListProvider.tsx";
import {Box, Button} from "@mui/material";

const CreateForm = () => {
    const listContext = useContext(TodoListContext)
    return (
        <Box component={'form'} className={'form'} onSubmit={(e) => {
            e.preventDefault()
            listContext.addTask(e.target[0].value, Priority[e.target[1].value])
        }}>
            <input type={'text'} placeholder={'Задача'} required/>
            <select>
                {
                    priorityStringArr().map((e, i) => (
                        <option className={'importance'}
                                rel={Priority[e].toString()}
                                key={i}>
                            {e}
                        </option>
                    ))
                }
            </select>
            <Button type={'submit'}
                    variant={'outlined'}>DO IT</Button>
        </Box>
    );
};

export default CreateForm;