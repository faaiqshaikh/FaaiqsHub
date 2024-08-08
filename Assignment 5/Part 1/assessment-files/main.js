// functionality for showing/hiding the comments section

const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');

commentWrapper.style.display = 'none';
function toggleComments() {
  showHideBtn.onclick = function() {
    let showHideText = showHideBtn.textContent;
    if(showHideText === 'Show comments') {
      showHideBtn.textContent = 'Hide comments';
      commentWrapper.style.display = 'block';
      showHideBtn.setAttribute('aria-pressed', 'true');
    } else {
      showHideBtn.textContent = 'Show comments';
      commentWrapper.style.display = 'none';
      showHideBtn.setAttribute('aria-pressed', 'false');
    }
  };
};
// Button click event
showHideBtn.onclick = function() {
  toggleComments();
};
// Button keydown event for Enter key
showHideBtn.addEventListener('keydown', function(e) {
  console.log('Key pressed:', e.key); // Debugging statement
  console.log('Key code:', e.keyCode); // Debugging statement
  if (e.key === 'Enter' || e.keyCode === 13) {
    toggleComments();
  }
});


// functionality for adding a new comment via the comments form

const form = document.querySelector('.comment-form');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');
const list = document.querySelector('.comment-container');

form.onsubmit = function(e) {
  e.preventDefault();
  submitComment();
};

function submitComment() {
  const listItem = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');
  const nameValue = nameField.value;
  const commentValue = commentField.value;

  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;

  list.appendChild(listItem);
  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);

  nameField.value = '';
  commentField.value = '';
}
