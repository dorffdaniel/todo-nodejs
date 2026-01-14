const url = 'http://127.0.0.1:3001'

let modal = document.getElementById('modalTasks');
let mod = new bootstrap.Modal(modal);

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

let idTask = null;

async function editTask(id) {

    let getEdit = url + '/getEdit';

    let dados = await fetch(`${getEdit}/${id}`);

    let res = await dados.json();

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
        idTask = res.id;
        mod.show();

    }

}



async function confirmEdit() {
    let tituloEdit = document.getElementById("tituloEdit").value;
    let descEdit = document.getElementById("descricaoEdit").value;
    let estadoEdit = document.getElementById("estadoEdit").value;
    let criacaoEdit = document.getElementById("criacaoEdit").value;

    if (!tituloEdit || !descEdit || !criacaoEdit) {
        alert('os campos nao podem ficarem vazios')
        return;
    }

    if (estadoEdit == '-1') {
        alert('seleciona o estado corretamente')
        return;
    }


    const data = { tituloEdit, descEdit, estadoEdit, criacaoEdit };
    let edit = url + '/edit'

    try {

        let dados = await fetch(`${edit}/${idTask}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        });

        console.log(dados)

        let resp = await dados.json();

        if (resp.mensagem) {
            mod.hide();
            alert('editado com sucesso');
            getListTask();

        }

        if (resp.error) {
            console.log(resp.error);
        }

    } catch (error) {
        console.log(error)
    }


}






document.addEventListener('DOMContentLoaded', () => {
    getListTask();
}); 