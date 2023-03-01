import {useState} from "react";
import * as React from "react";

const storage = window.localStorage

export enum Priority {
    Низкий,
    Средний,
    Высокий,
    Критичный
}

export const priorityStringArr = () => Object.keys(Priority).filter((el) => {
    return isNaN(Number(el))
})

export type Task = {
    task: string
    created: Date,
    isSolved: boolean,
    priority: Priority
}
export type TodoList = Task[]

export interface ITodoListContext {
    getList(): TodoList,

    addTask(task: string, priority: Priority): void,

    clickCheckBox(task: Task): void

    dropTask(task: Task): void
}

export const TodoListContext = React.createContext<ITodoListContext | null>(null)

export const TodoListProvider = ({children}): JSX.Element => {
    const listKey = 'list'

    function get() {
        const a = (storage.getItem(listKey)) as string | null
        if (a != null) {
            const l = JSON.parse(a) as TodoList
            l.forEach(e => e.created = new Date(e.created))
            return l
        } else
            return [] as TodoList
    }

    const [todoList, setTodoList] = useState(get)
    window.onunload = () => {
        storage.setItem(listKey, JSON.stringify(todoList))
        return false
    }

    const taskIndex = (task: Task) => todoList.indexOf(task)

    return (
        <TodoListContext.Provider value={{
            getList(): TodoList {
                return todoList
                    .sort((a, b) => {
                        if (a.priority > b.priority)
                            return -1
                        else if (a.priority < b.priority)
                            return 1
                        if (a.created > b.created)
                            return 1
                        else if (a.created < b.created)
                            return -1
                        else
                            return 0
                    })
            },
            addTask(task: string, priority: Priority) {
                setTodoList([...todoList, {
                    task: task,
                    priority: priority,
                    created: new Date(),
                    isSolved: false
                }])
            },
            clickCheckBox(task: Task) {
                const index = taskIndex(task)
                console.log(index, "ИДЕКС НАЖАТОГО")

                if (index < 0)
                    return
                const list = [...todoList]
                list[index].isSolved = !list[index].isSolved
                console.log(list)
                setTodoList(list)
            },
            dropTask(task: Task) {
                const index = taskIndex(task)
                if (index < 0)
                    return
                setTodoList(todoList.filter((e, ind) => ind !== index))
            }
        }}>
            {children}
        </TodoListContext.Provider>
    )
}


