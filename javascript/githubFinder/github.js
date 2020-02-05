class Github {
  constructor() {
    this.client_id = 'dbcd627d3042a766df80';
    this.client_secret = '840fb8e5e2b69e2c3d044d3f5069111c35fbdd55';
    this.repos_count = 6;
    this.repos_sort = 'created: asc';
  }


  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profileData = await profileResponse.json();
    const reposData = await reposResponse.json();

    return {
      profileData,
      reposData
    }
  }
}