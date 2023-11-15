"use client"
import CompletedTaskElement from '@/components/ComletedTaskElement'
import TaskElement from '@/components/TaskElement'
import { Button, TextField } from '@mui/material'
import React, { useEffect } from 'react'

export default function Home() {
  const [taskName, setTaskName] = React.useState("")
  const [taskDesc, setTaskDesc] = React.useState("")
  const [taskList, setTaskList] = React.useState([])
  const [completedTasks, setCompletedTasks] = React.useState([])
  const [completed, setCompleted] = React.useState(false)

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

  // Comleted Task Elements Start
  const handleCompletedDelete = (taskName) => {
    const updatedTasks = completedTasks.filter(task => task.taskName !== taskName)
    setCompletedTasks(updatedTasks)
  }
  // Comleted Task Elements End

  return (
    <main>
      <h1 className='text-4xl font-bold text-center m-8 text-blue-500'>To-Do</h1>

      <div className='flex gap-4 m-4 justify-center'>
        <TextField 
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
        />
      </div>
      <div className='flex justify-center gap-4 m-4'>
        <Button 
          variant='outlined'
          onClick={() => {
            setTaskList([...taskList, { taskName, taskDesc }])
            setTaskName("")
            setTaskDesc("")
          }}
        >
          Add Task
        </Button>
      </div>
      <div className='w-full max-w-screen-md mx-auto'>
        {taskList.map((x, i) => (
          <TaskElement
            key={i}
            taskName={x.taskName}
            taskDesc={x.taskDesc}
            onComplete={() => handleComplete(x.taskName, x.taskDesc)}
            onDelete={() => handleDelete(x.taskName)}
          />
        ))}
      </div>
      {completed && <div className='w-full max-w-screen-md mx-auto'>
        <h2 className='text-2xl font-semibold text-center m-4 text-green-500'>Completed Tasks</h2>
        {completedTasks.map((x, i) => (
          <CompletedTaskElement
            key={i}
            taskName={x.taskName}
            taskDesc={x.taskDesc}
            onDelete={() => handleCompletedDelete(x.taskName)}
          />
        ))}
      </div>}

      <div className='flex justify-center gap-4 m-4'>
        <Button
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
    </main>
  )
}
