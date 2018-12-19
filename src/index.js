// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
quoteList = () => document.querySelector('#quote-list')
document.addEventListener('DOMContentLoaded', () => {
quoteList().addEventListener('click', event => {
  if (event.target.className === 'btn-success'){
    addLike(event)
  }
  else if (event.target.className ==='btn-danger'){
    deleteQuote(event)
  }
})
 allQuotes()
})


function allQuotes(){
  fetch("http://localhost:3000/quotes")
  .then(res => res.json())
  .then(data => data.forEach((element) => {
    createLi(element)
  }))
}

function createLi(element){
  li = document.createElement('li')
  li.className = 'quote-card'
  blockquote = document.createElement('blockquote')
  blockquote.dataset.id = element.id
  blockquote.className = 'blockquote'
  li.appendChild(blockquote)
  blockquote.innerHTML = `<p class="mb-0">${element.quote}</p>`
  blockquote.innerHTML += `<footer class="blockquote-footer">${element.author}</footer><br>
  <button class='btn-success'>Likes: <span>0</span></button>
  <button class='btn-danger'>Delete</button>`
  quoteList().prepend(li)

}


function addLike(event){
  debugger
  targetQuote = event.target.parentNode
  currentLikes = targetQuote.querySelector('.btn-success span').innerText
  addLike = ++currentLikes
  fetch(`http://localhost:3000/quotes/${targetQuote.dataset.id}`, {
    method: "PATCH",
    header: {
      "ContentType": "application/json"},
    body: JSON.stringify({
      "likes": addLike
    })
  })
  .then(targetQuote.querySelector(".btn-success span")= addLike)
}

function deleteQuote(event){
console.log('deleted')
}
