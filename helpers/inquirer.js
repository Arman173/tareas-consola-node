const inquirer = require('inquirer');
const colors = require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.red } Crear Tarea`
            },
            {
                value: '2',
                name: `${ '2.'.yellow } Listar Tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar Tareas Completas`
            },
            {
                value: '4',
                name: `${ '4.'.cyan } Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.blue } Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.magenta } Borrar Tarea`
            },
            {
                value: '0',
                name: `${ '0.'.white } Salir`
            },
        ]
    }
];

const inquirerMenu = async() => {
    
    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opcion   '.white);
    console.log('===========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    // type: 'input'
    const continuar = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar...`
        }
    ];
    await inquirer.prompt(continuar);
}

const leerInput = async( message ) => {
    
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,

            // esta funcion valida la entrada del la pregunta
            // en este caso validamos si la entrada no esta en blanco
            validate( value ){
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, index) => {
        const i = `${ index + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ i } ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + ' Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);

    return id;
    // {
    //     value: tarea.id,
    //     name: `${ tarea.desc }`
    // },
}

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, index) => {
        const i = `${ index + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ i } ${ tarea.desc }`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(questions);

    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}