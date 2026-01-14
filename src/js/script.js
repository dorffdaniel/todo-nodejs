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
            const dia = String(data.getDate()).padStart(2, '0');      // dia com 2 dígitos
            const mes = String(data.getMonth() + 1).padStart(2, '0'); // mês começa do 0
            const ano = data.getFullYear();

            const dataFormatada = `${dia}/${mes}/${ano}`;

            let estd = null;
            let estado = element.estado;
            if (estado == 0) {
                estd = 'Pendente'
            } else {
                estd = 'Concluida'
            }

            msg += `<tr>`
            msg += `<td class='text-center'> ${element.titulo} </td>`
            msg += `<td class='text-center'> ${element.descricao} </td>`
            msg += `<td class='text-center'> ${estd} </td>`
            msg += `<td class='text-center'> ${dataFormatada} </td>`
            msg += `<td class='text-center'>
                <button class='btn btn-warning' onclick="editTask(${element.id})"> Editar </button>        
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

async function addTask() {
    let titulo = document.getElementById('titulo').value
    let descricao = document.getElementById('descricao').value
    let estado = document.getElementById('estado').value
    let dia = document.getElementById('criacao').value

    if (!titulo.trim() || !descricao.trim() || estado == '-1' || !dia.trim()) {
        alert("campo vazio");
        return;
    }

    let add = url + '/addTask';
    let data = { titulo, descricao, estado, dia };

    try {

        // envio 
        const dados = await fetch(add, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        });

        // obtenho a respota
        let resp = await dados.json();

        console.log(`respota ${resp}`);
        alert(resp.mensagem)
        if (resp.mensagem) {
            getListTask();
        }

    } catch (error) {
        console.log("Erro: " + error)
    }

}

async function editTask(id) {

    let getEdit = url + '/getEdit';

    let dados = await fetch(`${getEdit}/${id}`);

    console.log(dados);

    let res = await dados.json();

    console.log(res);
    console.log(res.id);
    console.log(res.titulo);
    let msg = null;
    if (res.estado == 0) {
        msg = 'Pendente'
    } else {
        msg = 'Concluida'
    }

    const data = new Date(res.data_criacao);
    const dataFormatada = data.toISOString().split('T')[0];

    if (res != null) {
        document.getElementById('tituloEdit').value = res.titulo;
        document.getElementById('descricaoEdit').value = res.descricao;
        document.getElementById('estdTask').innerHTML = msg;
        document.getElementById('estadoEdit').value = res.estado;
        document.getElementById('criacaoEdit').value = dataFormatada;


        let modal = document.getElementById('modalTasks');
        let mod = new bootstrap.Modal(modal);
        mod.show();
    }

}





document.addEventListener('DOMContentLoaded', () => {
    getListTask();
}); 