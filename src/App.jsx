import CreateForm from "./components/CreateForm";
import {TodoListProvider} from "./components/TodoListProvider.tsx";
import TasksDisplay from "./components/TasksDisplay";

function App() {
    return (
        <div className={'container'}>
            <TodoListProvider>
                <CreateForm/>
                <TasksDisplay/>
            </TodoListProvider>
        </div>
    );
}

export default App;
