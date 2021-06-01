const container = document.querySelector('#container');
const loading = document.querySelector('.loading');

getPost();
getPost();
getPost();

// To add the logic of scrolling we will first add an event listener on the scroll.
// The event will fire on scrolling and we will get three thing ie scrollTop, scrollHeight, clientHeight.
// To check when we reach the bottom, we can use the formula clientHeight + scrollTop >= scrollHeight-5.

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log({ scrollTop, scrollHeight, clientHeight });
    if (clientHeight + scrollTop >= scrollHeight - 5) {
        showLoading();
    }
});

function showLoading() {
    loading.classList.add('show');
    setTimeout(getPost, 500)
}

async function getPost() {
    const number = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${number}`);
    const text = await response.json();
    const user = await fetch(`https://randomuser.me/api/`);
    const userText = await user.json();
    const data =
    {
        post: text,                   /*same here*/
        user: userText.results[0]     /*user ka map khud obj h*/
    }
    addData(data);
    loading.classList.remove('show');
}

async function addData(data) {
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');

    postElement.innerHTML =
        `
    <h2 class="title">${data.post.title}</h2>
    <p class="text">${data.post.body}</p>
		<div class="user-info">
			<img src="${data.user.picture.large}" alt="${data.user.name.first}" />
			<span>${data.user.name.first} ${data.user.name.last}</span>
		</div>
    `;
    container.appendChild(postElement);
}