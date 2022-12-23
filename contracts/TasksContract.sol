//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {
    uint256 public taskCounter = 0; //Contador de las tareas

    constructor() {
        createTask("1. Curso BC", "Concluir el primer curso de BC");
    }

    //Datos que va devolver cuando se cree una tarea
    event TaskCreated(
        uint256 id,
        string title,
        string description,
        bool done,
        uint256 createdAt
    );

    event TaskToggleDone(uint256 id, bool done); //Para mostrar el estado de la tarea que fue modificada

    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createAt;
    }

    mapping(uint256 => Task) public tasks;

    //Funcion para crear una nueva tarea
    function createTask(string memory _title, string memory _description)
        public
    {
        taskCounter++; //Incrementa el contador.
        tasks[taskCounter] = Task(
            taskCounter,
            _title,
            _description,
            false,
            block.timestamp
        );

        //Emitir la función - Esto devuelve la tarea que ha sido creada
        emit TaskCreated(
            taskCounter,
            _title,
            _description,
            false,
            block.timestamp
        );
    }

    //Actualizar el estado de la tarea de False a True.
    function toggleDone(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
        emit TaskToggleDone(_id, _task.done); //Envia el estado de la tarea actualizada, de false a true o viceversa
    }
}
