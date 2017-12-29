import './css/style.css';
import './sass/index.scss';

window.onload = () => {
    let a = document.createElement('a');
    a.innerHTML = 'test h1';
    a.href = 'b.html';
    document.body.appendChild(a);
};