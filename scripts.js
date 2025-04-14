let barbeiros = [];
let servicos = [];
let agendamentos = [];

const API_URL = 'http://localhost:5000';

async function carregarBarbeiros() {
  try {
    const response = await fetch(`${API_URL}/barbeiros`);
    if (!response.ok) throw new Error('Falha ao buscar barbeiros');
    barbeiros = await response.json();
  } catch (error) {
    console.warn('API offline, carregando barbeiros do localStorage.');
    barbeiros = JSON.parse(localStorage.getItem('barbeiros')) || [];
  }
  atualizarTabelaBarbeiros();
}

async function carregarServicos() {
  try {
    const response = await fetch(`${API_URL}/servicos`);
    if (!response.ok) throw new Error('Falha ao buscar serviços');
    servicos = await response.json();
  } catch (error) {
    console.warn('API offline, carregando serviços do localStorage.');
    servicos = JSON.parse(localStorage.getItem('servicos')) || [];
  }
  atualizarTabelaServicos();
}

function showSection(sectionId) {
  document.querySelectorAll('.newItem').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');
}

async function adicionarBarbeiro() {
  const nome = document.getElementById('nomeBarbeiro').value.trim();
  if (nome === '') return alert('Digite o nome do barbeiro.');

  try {
    const response = await fetch(`${API_URL}/barbeiros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome })
    });
    if (!response.ok) throw new Error('Falha ao adicionar barbeiro');
    const novoBarbeiro = await response.json();
    barbeiros.push(novoBarbeiro);
  } catch (error) {
    console.warn('API offline, salvando barbeiro localmente.');
    barbeiros.push({ nome });
    localStorage.setItem('barbeiros', JSON.stringify(barbeiros));
  }

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
  barbeiros.forEach((barbeiro, index) => {
    table.innerHTML += `
      <tr>
        <td>${barbeiro.nome || barbeiro}</td>
        <td><button onclick="removerBarbeiro(${index})">🗑️</button></td>
      </tr>
    `;
  });
}

function removerBarbeiro(index) {
  barbeiros.splice(index, 1);
  localStorage.setItem('barbeiros', JSON.stringify(barbeiros));
  atualizarTabelaBarbeiros();
}

async function adicionarServico() {
  const nome = document.getElementById('nomeServico').value.trim();
  const preco = document.getElementById('precoServico').value.trim();
  if (nome === '' || preco === '') return alert('Preencha todos os campos.');

  try {
    const response = await fetch(`${API_URL}/servicos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, preco: parseFloat(preco) })
    });
    if (!response.ok) throw new Error('Falha ao adicionar serviço');
    const novoServico = await response.json();
    servicos.push(novoServico);
  } catch (error) {
    console.warn('API offline, salvando serviço localmente.');
    servicos.push({ nome, preco });
    localStorage.setItem('servicos', JSON.stringify(servicos));
  }

  atualizarTabelaServicos();
  document.getElementById('nomeServico').value = '';
  document.getElementById('precoServico').value = '';
}

function atualizarTabelaServicos() {
  const table = document.getElementById('tableServicos');
  table.innerHTML = `
    <tr>
      <th>Nome</th>
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
  localStorage.setItem('servicos', JSON.stringify(servicos));
  atualizarTabelaServicos();
}

async function adicionarAgendamento() {
  const cliente = document.getElementById('nomeCliente').value.trim();
  const barbeiro = document.getElementById('barbeiroAgendamento').value.trim();
  const servico = document.getElementById('servicoAgendamento').value.trim();
  const dataHora = document.getElementById('dataHoraAgendamento').value.trim();
  if (!cliente || !barbeiro || !servico || !dataHora) {
    return alert('Preencha todos os campos.');
  }

  const novoAgendamento = { cliente, barbeiro, servico, data_hora: dataHora };

  try {
    const response = await fetch(`${API_URL}/agendamentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoAgendamento)
    });
    if (!response.ok) throw new Error('Falha ao adicionar agendamento');
    const agendamento = await response.json();
    agendamentos.push(agendamento);
  } catch (error) {
    console.warn('API offline, salvando agendamento localmente.');
    agendamentos.push(novoAgendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  }

  atualizarTabelaAgendamentos();
  document.getElementById('nomeCliente').value = '';
  document.getElementById('barbeiroAgendamento').value = '';
  document.getElementById('servicoAgendamento').value = '';
  document.getElementById('dataHoraAgendamento').value = '';
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
        <td>${agendamento.data_hora}</td>
        <td><button onclick="removerAgendamento(${index})">🗑️</button></td>
      </tr>
    `;
  });
}

function removerAgendamento(index) {
  agendamentos.splice(index, 1);
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  atualizarTabelaAgendamentos();
}

window.onload = () => {
  carregarBarbeiros();
  carregarServicos();
};
