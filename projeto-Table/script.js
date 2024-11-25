const clientes = [];
let idCounter = 1;

function adicionarClientes() {
    const nome = document.getElementById('nomeInput').value;
    const email = document.getElementById('emailInput').value;
    const telefone = document.getElementById('telefoneInput').value;

    if (nome === "" || email === "" || telefone === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const nomeRegex = /^[a-zA-Z\s]+$/;
    if (!nomeRegex.test(nome)) {
        alert("O nome não pode conter números ou caracteres especiais!");
        document.getElementById('nomeInput').value = ''; 
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido!");
        document.getElementById('emailInput').value = '';
        return;
    }

    if (!/^\d+$/.test(telefone)) {
        alert("O telefone deve conter apenas números!");
        document.getElementById('telefoneInput').value = '';
        return;
    }

    const cliente = {
        id: idCounter++,
        nome: nome,
        email: email,
        telefone: telefone
    };

    clientes.push(cliente);

    limparCampos();
    atualizarTabela();
}

function limparCampos() {
    document.getElementById('nomeInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('telefoneInput').value = '';
}

function atualizarTabela() {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';

    clientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td><button class="btn btn-danger" id="btnRemove" onclick="removerCliente(${cliente.id})">
                <i class="fa-solid fa-trash"></i>
            </button></td>
        `;
        tbody.appendChild(row);
    });
}

function removerCliente(clienteId) {
    const index = clientes.findIndex(cliente => cliente.id === clienteId);
    
    if (index !== -1) {
        clientes.splice(index, 1); 
        atualizarTabela();
    }
}
