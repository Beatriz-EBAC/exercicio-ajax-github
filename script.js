
const usuario = 'Beatriz-EBAC';

async function buscarUsuario() {
    try {
        const resposta = await fetch(`https://api.github.com/users/${usuario}`);

        if (!resposta.ok) {
            throw new Error('Não foi possível encontrar o usuário.');
        }

        const dados = await resposta.json();

        document.querySelector('.profile-avatar').src = dados.avatar_url;
        document.querySelector('.profile-avatar').alt = `Foto de ${dados.name || dados.login}`;

        document.querySelector('.profile-name').textContent =
            dados.name || dados.login;

        document.querySelector('.profile-username').textContent =
            `@${dados.login}`;

        const numeros = document.querySelectorAll('.numbers-item');

        numeros[0].innerHTML = `<h4>Repositórios</h4>${dados.public_repos}`;
        numeros[1].innerHTML = `<h4>Seguidores</h4>${dados.followers}`;
        numeros[2].innerHTML = `<h4>Seguindo</h4>${dados.following}`;

        const link = document.querySelector('.profile-link');
        link.href = dados.html_url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

    } catch (erro) {
        console.error('Erro ao buscar dados do GitHub:', erro);

        document.querySelector('.profile-name').textContent =
            'Não foi possível carregar o perfil.';

        document.querySelector('.profile-username').textContent =
            'Tente novamente mais tarde.';
    }
}

buscarUsuario();
