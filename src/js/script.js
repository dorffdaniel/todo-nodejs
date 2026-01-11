const url = 'http://127.0.0.1:3001'

async function getListTask() {

    try {
        let pathList = url + '/getList'

        let data = await fetch(pathList);

        let res = await data.json();

        console.log(res)

        let msg = '';
        res.forEach(element => {
            const data = new Date(element.data_criacao);
            const dataFormatada = data.toISOString().split('T')[0];

            let estd = null;
            let estado = element.estado;
            if (estado == 0) {
                estd = 'Pendente'
            } else {
                estd = 'confirmado'
            }

            msg += `<tr>`
            msg += `<td class='text-center'> ${element.titulo} </td>`
            msg += `<td class='text-center'> ${element.descricao} </td>`
            msg += `<td class='text-center'> ${estd} </td>`
            msg += `<td class='text-center'> ${dataFormatada} </td>`
            msg += `<td class='text-center'>
                <button class='btn btn-warning'> Editar </button>        
                <button class='btn btn-danger'>Apagar</button>        
            </td>`
            msg += `</tr>`
        });

        document.getElementById('res').innerHTML = msg;

    } catch (error) {
        console.log(`servidor pode estar desligado`)
        console.log(`erro: ${error}`)
    }

}



document.addEventListener('DOMContentLoaded', () => {
    getListTask();
}); 