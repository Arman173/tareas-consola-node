const colors = require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
// const { mostrarMenu, pausa } = require('./helpers/mensajes');

const main = async() => {
    
    let opt = '' // esta vaiable contendra el valor de la opcion introducida
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB ){
        // Establecer las tareas
        // TODO: cargarTareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    // await pausa();

    do{

        // imprimir el menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // crear tarea
                // preguntamos cual sera la descripcion y la guardamos en la const desc
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea( desc );
            break;

            case '2':
                // listar tareas
                tareas.listadoCompleto();
            break;

            case '3':
                // listar tareas completadas
                tareas.listarPendienteCompletadas();
            break;

            case '4':
                // listar tareas pendientes
                tareas.listarPendienteCompletadas(false);
            break;

            case '5':
                // completado | pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas( ids );
            break;

            case '6':
                // borrar tarea
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0' ){
                    const ok = await confirmar('Estas Seguro?');
                    if( ok ){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        }

        guardarDB( tareas.listadoArr );
        // poner en pausa la aplicacion (para continuar se oprime ENTER)
        await pausa();

    } while(opt !== '0');

}


main();


