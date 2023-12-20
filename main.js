/*----------------------------------------------------------------------
            DICHIARAZIONI E INIZIALIZZAZIONI GENERALI
----------------------------------------------------------------------*/
const posts = [
  {
    id: 1,
    content:
      'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
    media: 'https://unsplash.it/600/300?image=171',
    author: {
      name: 'Phil Mangione',
      image: 'https://unsplash.it/300/300?image=15',
    },
    likes: 80,
    created: '2021-06-25',
  },
  {
    id: 2,
    content:
      'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
    media: 'https://unsplash.it/600/400?image=112',
    author: {
      name: 'Sofia Perlari',
      image: 'https://unsplash.it/300/300?image=10',
    },
    likes: 120,
    created: '2021-09-03',
  },
  {
    id: 3,
    content:
      'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
    media: 'https://unsplash.it/600/400?image=234',
    author: {
      name: 'Chiara Passaro',
      image: 'https://unsplash.it/300/300?image=20',
    },
    likes: 78,
    created: '2021-05-15',
  },
  {
    id: 4,
    content:
      'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
    media: 'https://unsplash.it/600/400?image=24',
    author: {
      name: 'Luca Formicola',
      image: null,
    },
    likes: 56,
    created: '2021-04-03',
  },
  {
    id: 5,
    content:
      'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
    media: 'https://unsplash.it/600/400?image=534',
    author: {
      name: 'Alessandro Sainato',
      image: 'https://unsplash.it/300/300?image=29',
    },
    likes: 95,
    created: '2021-03-05',
  },
];

let likedPosts = [];

/*----------------------------------------------------------------------
           CREAZIONE POST DELLA PAGINA
----------------------------------------------------------------------*/

const $postContainer = document.querySelector('#container');
posts.forEach((post) => {
  // * Creazione degli elementi HTML

  const $postElement = getAnElementWithClasses(
    'article',
    'post'
  ); /*metodo per ottenere elementi in base a più nomi di classi.*/
  /*----------------------------------------------------------------------
           CAMBIAMENTO DELLE DATE DEI POST
   ----------------------------------------------------------------------*/
  const postDate = new Date(post['created']);
  const postDateAmericanFormat = postDate.toLocaleDateString('ue');
  const postAuthorNameInitials = post['author']['name'].replace(/[a-z]/g, '');

  /*----------------------------------------------------------------------
           MODIFICA DEL CONTENUTP HTML
   ----------------------------------------------------------------------*/
  $postElement.innerHTML = `
   <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <img class="profile-pic" src="${post['author']['image']}" alt="${postAuthorNameInitials}" title="immagine di profilo di ${post['author']['name']}">                    
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${post['author']['name']}</div>
                    <div class="post-meta__time">${postDateAmericanFormat}</div>
                </div>                    
            </div>
        </div>

        <div class="post__text">${post['content']}</div>

        <div class="post__image">
            <img src="${post['media']}" alt="Img casuale" title='Img casuale'>
        </div>

        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="1">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-1" class="js-likes-counter">${post['likes']}</b> persone
                </div>
            </div> 
        </div>            
    `;

  $postContainer.append($postElement);
});

function getAnElementWithClasses(element, ...elementClasses) {
  let htmlElement = document.createElement(element);

  elementClasses.forEach((elementClass) => {
    htmlElement.classList.add(elementClass);
  });

  return htmlElement;
}
/*------------------------------------------------------------
           CREAZIONE DI ARREY 
   -----------------------------------------------------------*/
const $postElements = document.querySelectorAll('.post');
const $likeBtnElements = document.querySelectorAll('.post .js-like-button');
const $likesCounterElements = document.querySelectorAll(
  '.post .js-likes-counter'
);
/*------------------------------------------------------------
             FUNZIONI
   -----------------------------------------------------------*/
$likeBtnElements.forEach((likeBtnElement, index) => {
  let likePut = false;

  likeBtnElement.addEventListener('click', (event) => {
    event.preventDefault();
    let likesCounter = posts[index]['likes'];

    if (!likePut) {
      likeBtnElement.classList.add('like-button--liked');
      likesCounter++;
      $likesCounterElements[index].innerHTML = likesCounter;
      const likedPostId = posts[index]['id'];
      likedPosts.push(likedPostId);
      likePut = true;
      console.log(likedPosts);
    } else {
      likeBtnElement.classList.remove('like-button--liked');
      $likesCounterElements[index].innerHTML = likesCounter;
      const likedPostId = posts[index]['id'];
      likedPosts = likedPosts.filter((likedPost) => {
        return likedPost != likedPostId;
      });
      likePut = false;
      console.log(likedPosts);
    }
  });
});
