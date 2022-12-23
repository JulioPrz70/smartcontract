const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {

    //Antes de ejecutar alguna funcion, ejecutar primero...
    before(async () => {
        this.tasksContract = await TasksContract.deployed();
    });

    //Que es lo que va realizar la siguiente tarea. Descripcion
    it('Migrate deployed successfully', async () => {
        const address = this.tasksContract.address;
        //Comparamos que contenga la dirección de la BC
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it('get Tasks List', async () => {
        const tasksCounter = await this.tasksContract.taskCounter();
        const task = await this.tasksContract.tasks(tasksCounter);

        assert.equal(task.id.toNumber(), tasksCounter);
        assert.equal(task.title, "1. Curso BC");
        assert.equal(task.description, "Concluir el primer curso de BC");
        assert.equal(task.done, false);
        assert.equal(tasksCounter, 1);
    });

    it('Task Create Successfully', async () => {
        const result = await this.tasksContract.createTask("Some Task", "Description Two");
        const taskEvent = result.logs[0].args;
        const tasksCounter = await this.tasksContract.taskCounter();

        assert.equal(tasksCounter, 2);
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "Some Task");
        assert.equal(taskEvent.description, "Description Two");
        assert.equal(taskEvent.done, false);
    });

    it('Task Toggle Done', async () => {
        const result = await this.tasksContract.toggleDone(1);
        const taskEvent = result.logs[0].args;
        const task = await this.tasksContract.tasks(1);

        assert.equal(task.done, true);
        assert.equal(taskEvent.done, true);
        assert.equal(taskEvent.id, 1);
    });
    
});