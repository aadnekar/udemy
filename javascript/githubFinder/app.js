// Init GitHub
const github = new Github;
// Init UI
const ui = new UI;

// Search input
const searchUser = document.getElementById('searchUser');

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value;

  if(userText !== '') {
    // Make http call
    github.getUser(userText)
      .then(data => {
        if(data.profileData.message === 'Not Found') {
          // Show alert
          ui.showAlert('User not found', 'alert alert-danger');
        } else {
          // Show profile
          ui.showProfile(data.profileData);
          // Show repos
          ui.showRepos(data.reposData);
        }
      })
  } else {
    // Clear profile
    ui.clearProfile();
  }
})