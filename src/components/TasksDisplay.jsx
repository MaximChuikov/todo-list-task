import React, {useContext} from 'react';
import {TodoListContext, Priority} from "./TodoListProvider.tsx";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const TasksDisplay = () => {
    const listContext = useContext(TodoListContext)
    const todoList = listContext.getList()
    return (
        <>
            {
                todoList.map((e, i) => (
                    <div key={e.created.toString()} className={'task-container'}>
                        <div className={'task-buttons-container'}>
                            <div className={'task-index'}>
                                {i + 1}
                            </div>
                            <input type={'checkbox'}
                                   className={'clicker-task-buttons checkbox'}
                                   defaultChecked={e.isSolved}
                                   onClick={() => listContext.clickCheckBox(e)}/>
                            <DeleteForeverIcon className={'clicker-task-buttons'}
                                               onClick={() => listContext.dropTask(e)}/>
                        </div>
                        <label className={'task-text'} rel={e.isSolved.toString()}>
                            {e.task}
                        </label>
                        <div>
                            <div className={'importance task-priority'}
                                 rel={e.priority.toString()}>
                                {Priority[e.priority]}
                            </div>
                            <div className={'task-date'}>{e.created.toLocaleString()}</div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default TasksDisplay;