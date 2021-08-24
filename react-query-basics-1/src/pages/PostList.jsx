import { useQuery } from 'react-query'
import {
  Spinner,
  useToast,
  Progress,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from '@chakra-ui/react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import * as constants from '../constants'
import { GetPostList } from '../backend/Queries'
import React from 'react'

const PostList = () => {
  const { history, showErrorExample } = useContext(AppContext)
  console.log(`showErrorExample: ${showErrorExample}`)

  const allPostsUrl = showErrorExample
    ? `https://jsonplaceholder.typicode.com/posts////`
    : `https://jsonplaceholder.typicode.com/posts/`

  const { isLoading, isFetching, data, isError } = useQuery(
    [constants.QUERY_KEYS.POSTS, allPostsUrl],
    () => GetPostList(allPostsUrl),
    {
      retry: 1,
      retryDelay: 500,
    },
  )
  console.log(
    `isLoading: ${isLoading}, isError: ${isError}, data: ${data?.length}`,
  )
  const chakraToast = useToast()
  const chakraToastRef = React.useRef()

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )
  }

  if (isError) {
    chakraToastRef.current = chakraToast({
      title: 'Error getting posts !!!',
      description: 'there was an api error we think',
      status: 'error',
      duration: '8000',
      isClosable: true,
    })

    return chakraToastRef.current
  }

  return (
    <div>
      {isFetching && <Progress hasStripe value={100} />}
      <Table>
        <TableCaption>List of your posts</TableCaption>
        <Thead>
          <Tr>
            <Th>User Id</Th>
            <Th>Post Id</Th>
            <Th>Post Title</Th>
            <Th>Post Body</Th>
            <Th>View Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((el) => (
            <Tr key={`${el.userId},${el.id}`}>
              <Td>{el.userId}</Td>
              <Td>{el.id}</Td>
              <Td>{el.title}</Td>
              <Td>{el.body}</Td>
              <Td>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => history.push(`/posts/${el.id}`)}
                >
                  Get Details
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      here are your posts
    </div>
  )
}

export default PostList
