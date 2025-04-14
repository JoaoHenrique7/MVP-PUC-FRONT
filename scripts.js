let barbeiros = [];
let servicos = [];
let agendamentos = [];

function showSection(sectionId) {
  document.querySelectorAll('.newItem').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');
}

function adicionarBarbeiro() {
  const nome = document.getElementById('nomeBarbeiro').value;
  if (nome.trim() === '') return alert('Digite o nome do barbeiro.');

  barbeiros.push(nome);
  atualizarTabelaBarbeiros();
  document.getElementById('nomeBarbeiro').value = '';
}

function atualizarTabelaBarbeiros() {
  const table = document.getElementById('tableBarbeiros');
  table.innerHTML = `
    <tr>
      <th>Nome</th>
      <th><img src="https://cdn-icons-png.flaticon.com/512/126/126468.png" width="15px" height="15px"></th>
    </tr>
  `;
  barbeiros.forEach((nome, index) => {
    table.innerHTML += `
      <tr>
        <td>${nome}</td>
        <td><button onclick="removerBarbeiro(${index})">🗑️</button></td>
      </tr>
    `;
  });
}

function removerBarbeiro(index) {
  barbeiros.splice(index, 1);
  atualizarTabelaBarbeiros();
}

function adicionarServico() {
  const nome = document.getElementById('nomeServico').value;
  const preco = document.getElementById('precoServico').value;
  if (nome.trim() === '' || preco.trim() === '') return alert('Preencha todos os campos.');

  servicos.push({ nome, preco });
  atualizarTabelaServicos();
  document.getElementById('nomeServico').value = '';
  document.getElementById('precoServico').value = '';
}

function atualizarTabelaServicos() {
  const table = document.getElementById('tableServicos');
  table.innerHTML = `
    <tr>
      <th>Serviço</th>
      <th>Preço</th>
      <th><img src="https://cdn-icons-png.flaticon.com/512/126/126468.png" width="15px" height="15px"></th>
    </tr>
  `;
  servicos.forEach((servico, index) => {
    table.innerHTML += `
      <tr>
        <td>${servico.nome}</td>
        <td>R$ ${servico.preco}</td>
        <td><button onclick="removerServico(${index})">🗑️</button></td>
      </tr>
    `;
  });
}

function removerServico(index) {
  servicos.splice(index, 1);
  atualizarTabelaServicos();
}

function adicionarAgendamento() {
  const cliente = document.getElementById('clienteNome').value;
  const barbeiro = document.getElementById('agendamentoBarbeiro').value;
  const servico = document.getElementById('agendamentoServico').value;
  const dataHora = document.getElementById('dataHora').value;

  if (!cliente || !barbeiro || !servico || !dataHora) return alert('Preencha todos os campos.');

  agendamentos.push({ cliente, barbeiro, servico, dataHora });
  atualizarTabelaAgendamentos();
  
  document.getElementById('clienteNome').value = '';
  document.getElementById('agendamentoBarbeiro').value = '';
  document.getElementById('agendamentoServico').value = '';
  document.getElementById('dataHora').value = '';
}

function atualizarTabelaAgendamentos() {
  const table = document.getElementById('tableAgendamentos');
  table.innerHTML = `
    <tr>
      <th>Cliente</th>
      <th>Barbeiro</th>
      <th>Serviço</th>
      <th>Data e Hora</th>
      <th><img src="https://cdn-icons-png.flaticon.com/512/126/126468.png" width="15px" height="15px"></th>
    </tr>
  `;
  agendamentos.forEach((agendamento, index) => {
    table.innerHTML += `
      <tr>
        <td>${agendamento.cliente}</td>
        <td>${agendamento.barbeiro}</td>
        <td>${agendamento.servico}</td>
        <td>${new Date(agendamento.dataHora).toLocaleString('pt-BR')}</td>
        <td><button onclick="removerAgendamento(${index})">🗑️</button></td>
      </tr>
    `;
  });
}

function removerAgendamento(index) {
  agendamentos.splice(index, 1);
  atualizarTabelaAgendamentos();
}
