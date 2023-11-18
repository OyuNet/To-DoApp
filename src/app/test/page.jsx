"use client"
import CompletedTaskElement from '@/components/ComletedTaskElement'
import TaskElement from '@/components/TaskElement'
import { Modal, Button, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'

export default function Home() {

    const [taskName, setTaskName] = React.useState("")
    const [taskDesc, setTaskDesc] = React.useState("")
    const [taskList, setTaskList] = React.useState([])
    const [completedTasks, setCompletedTasks] = React.useState([])
    const [completed, setCompleted] = React.useState(false)

    const [editingTask, setEditingTask] = useState(null);

    const editTask = (taskName, taskDesc) => {
        setEditingTask({ taskName, taskDesc });
    };

    const saveEditedTask = () => {
        console.log('Saving edited task:', editingTask);
    
        const updatedTaskList = taskList.map(task => {
            if (task.taskName === editingTask.taskName) {
                return { ...task, taskName: editingTask.taskName, taskDesc: editingTask.taskDesc };
            }
            return task;
        });
    
        setTaskList(updatedTaskList);
        localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
    
        setEditingTask(null);
    };
  

    useEffect(() => {
        console.log("Reading from localStorage...");
        const storedTaskList = JSON.parse(localStorage.getItem('taskList')) || [];
        const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

        console.log("Task List from localStorage:", storedTaskList);
        console.log("Completed Tasks from localStorage:", storedCompletedTasks);

        setTaskList(storedTaskList);
        setCompletedTasks(storedCompletedTasks);
    }, []);

    useEffect(() => {
        completedTasks.length !== 0 ? setCompleted(true) : setCompleted(false)
    }, [completedTasks])

    // Normal Task Elements Start
    const handleDelete = (taskName) => {
        const updatedTasks = taskList.filter(task => task.taskName !== taskName)
        setTaskList(updatedTasks)
    }

    const handleComplete = (taskName, taskDesc) => {
        setCompletedTasks([...completedTasks, {taskName, taskDesc}])
        handleDelete(taskName)
    }

    // Normal Task Elements End

    // Completed Task Elements Start
    const handleCompletedDelete = (taskName) => {
        const updatedTasks = completedTasks.filter(task => task.taskName !== taskName)
        setCompletedTasks(updatedTasks)
    }

    const handleUndo = (taskName, taskDesc) => {
        setTaskList([...taskList, {taskName, taskDesc}])
        handleCompletedDelete(taskName)
    }
    // Completed Task Elements End

    return (
        <main>
            <div className='grid grid-cols-3 gap-2'>
                <div className='col h-full'>
                    <h1 className='text-4xl font-bold text-center m-8 text-blue-500'>To-Do</h1>
                    <div className='flex flex-col space-y-4 p-4 justify-center flex-wrap'>
                        <TextField
                            className='w-1/2 mx-auto'
                            value={taskName}
                            variant='outlined'
                            label='Task Name'
                            onChange={(event) => {setTaskName(event.target.value)}}
                            required
                        />
                        <TextField
                            value={taskDesc}
                            variant='outlined'
                            label='Description'
                            onChange={(event) => {setTaskDesc(event.target.value)}}
                            required
                            multiline
                        />
                        <Button
                            className='w-1/3 mx-auto'
                            variant='outlined'
                            onClick={() => {
                                setTaskList([...taskList, { taskName, taskDesc }])
                                setTaskName("")
                                setTaskDesc("")
                            }}
                        >
                            Add Task
                        </Button>
                        <Button
                            className='w-1/3 mx-auto'
                            variant='outlined'
                            onClick={() => {
                                console.log("Writing to localStorage...");
                                localStorage.setItem('taskList', JSON.stringify(taskList));
                                localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
                            }}
                        >
                            Save Tasks
                        </Button>
                    </div>
                </div>
                <div className='col h-full'>
                    <h1 className='text-4xl font-bold text-center m-8 text-blue-500'>Current Tasks</h1>
                    {taskList.map((x, i) => (
                        <TaskElement
                            key={i}
                            taskName={x.taskName}
                            taskDesc={x.taskDesc}
                            onComplete={() => handleComplete(x.taskName, x.taskDesc)}
                            onDelete={() => handleDelete(x.taskName)}
                            onEdit={() => editTask(x.taskName, x.taskDesc)} 
                        />
                    ))}
                </div>
                <div className='col h-full'>
                    <h1 className='text-4xl font-bold text-center m-8 text-blue-500'>Completed Tasks</h1>
                    {completed && completedTasks.map((x, i) => (
                        <CompletedTaskElement
                            key={i}
                            taskName={x.taskName}
                            taskDesc={x.taskDesc}
                            onDelete={() => handleCompletedDelete(x.taskName)}
                            onUndo={() => handleUndo(x.taskName, x.taskDesc)}
                        />
                    ))}
                </div>
            </div>

            {editingTask && (
                <Modal open={Boolean(editingTask)} onClose={() => setEditingTask(null)}>
                    <div className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 md:p-8 rounded-md w-full md:w-80 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
                    <TextField
                        label="Task Name"
                        value={editingTask.taskName}
                        onChange={(e) => setEditingTask({ ...editingTask, taskName: e.target.value })}
                        className="m-4 mx-auto w-full"
                    />
                    <TextField
                        label="Description"
                        value={editingTask.taskDesc}
                        onChange={(e) => setEditingTask({ ...editingTask, taskDesc: e.target.value })}
                        className="m-4 mx-auto w-full h-16"
                    />
                    <Button onClick={saveEditedTask} variant="contained" color="primary" className="mx-auto bg-blue-500">
                        Save
                    </Button>
                    </div>
                </Modal>
            )}
        </main>
    )
}