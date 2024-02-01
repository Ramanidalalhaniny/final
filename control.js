<div class="title">
  <h2>blogs</h2>
  <a href="/add-post" class="button">Add New</a>
</div>
<ul class="admin-posts" id="postList">
</ul>
<script>
  var data = [
    { _id: '1', title: 'Post 1', body: 'Content of Post 1' },
    { _id: '2', title: 'Post 2', body: 'Content of Post 2' },
    // Add more 
  ];
  var postList = document.getElementById('postList');
  data.forEach(post => {var listItem = document.createElement('li');
    listItem.innerHTML = `<a href="/post/${post._id}">
        ${post.title} &nearr;
      </a>
      <div class="admin-post-controls">
        <a href="/edit-post/${post._id}" class="btn">Edit</a>
        <button onclick="deletePost('${post._id}')" class="btn-delete btn">Delete</button>
      </div>
    `;
    postList.appendChild(listItem);
  });

  function deletePost(postId) {
    fetch(`/delete-post/${postId}?_method=DELETE`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Post deleted:', data);
    })
    .catch(error => {
      console.error('Error deleting post:', error);
    });
  }
</script>
