<a href="/control">&larr; Back</a>
<div class="title">
  <h2>View / Edit blog</h2>
  <form id="deletePostForm" action="/delete-post/POST_ID?_method=DELETE" method="POST">
    <input type="submit" value="Delete" class="btn-delete btn">
  </form>
</div>
<form id="editPostForm" action="/edit-post/POST_ID?_method=PUT" method="POST">
  <label for="title"><b>Title</b></label>
  <input type="text" placeholder="Post Title" name="title" id="editPostTitle" value="POST_TITLE">
  <label for="body"><b>Content</b></label>
  <textarea name="body" cols="56" rows="12" id="editPostBody">POST_BODY</textarea>
  <input type="button" value="Update" class="btn" onclick="updatePost()">
</form>
<script>
  function updatePost() {
    var title = document.getElementById('editPostTitle').value;
    var body = document.getElementById('editPostBody').value;
    fetch('/edit-post/POST_ID?_method=PUT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title, body: body }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Post updated:', data);
    })
    .catch(error => {
      console.error('Error updating post:', error);
    });
  }
</script>
