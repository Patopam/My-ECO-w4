document.getElementById('postForm').addEventListener('submit', createPost);

function backToMain() {
    window.location.href = '/client/player/index.html';
}

async function createPost(event) {
    event.preventDefault();
    const content = document.getElementById('content').value;
    const token = localStorage.getItem('token');
    try {
        await fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, content })
        });
        alert('Post creado');
    } catch (error) {
        console.error(error);
        alert('Error al crear post');
    }
}
