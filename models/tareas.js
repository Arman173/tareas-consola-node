const Tarea = require("./tarea");


class Tareas {
    
    _listado = {};

    get listadoArr() {
        
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
        
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
        // console.log(this._listado);
    }

    crearTarea( desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {
        let listado = '\n';
        this.listadoArr.forEach( (tarea, index) => {
            const i = `${index + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            listado += `${ i } ${ desc } :: ${ estado }\n`;
        });
        console.log(listado);
    }

    listarPendienteCompletadas( completadas = true ) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => {
            
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                                ? 'Completada: '.green + completadoEn
                                : 'Pendiente'.red;
            if(completadas){
                // mostrar completadas
                if(completadoEn){
                    contador++;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                }
            }else{
                // mostrar pendientes
                if(!completadoEn){
                    contador++;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                }
            }
        });
        console.log();
    }

    toggleCompletadas( ids = [] ) {
        
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {

            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }

        });
    }
    
}

module.exports = Tareas;
