import axios from 'axios'

export const GetPostList = async (getPostsUrl) => {
  const posts = await axios.get(getPostsUrl)

  return posts.data
}

export const GetOnePostDetails = async (queryArr) => {
  const postDetails = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${queryArr.queryKey[1].postId}`,
  )

  return postDetails.data
}
