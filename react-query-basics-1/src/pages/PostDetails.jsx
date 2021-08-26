import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useContext, useState } from 'react'
import * as constants from '../constants'
import { GetOnePostDetails, UpdatePost } from '../backend/Queries'
import {
  Button,
  Progress,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { AppContext } from '../context/AppContext'

export const PostDetails = (props) => {
  const { id } = props.match.params
  const { history } = useContext(AppContext)

  const [postDetailsState, setPostDetailsState] = useState({
    title: '',
    body: '',
  })

  const queryClient = useQueryClient()
  const mutation = useMutation(UpdatePost, {
    //(data) => refetch(),
    onSuccess:
      // or another idea is using queryCache to refresh the page
      // when input edits are submitted
      () => queryClient.invalidateQueries(),
  })

  const { isLoading, isFetching, data, isError, refetch } = useQuery(
    [constants.QUERY_KEYS.POSTS, { postId: id }],
    GetOnePostDetails,
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setPostDetailsState({
          title: data.title,
          body: data.body,
        })
      },
    },
  )

  const onChangeHandler = (e) => {
    e.persist()

    setPostDetailsState((existingDetails) => ({
      ...existingDetails,
      [e.target.name]: e.target.value,
    }))
  }
  console.log(
    `mutated obj: ${JSON.stringify(mutation.variables)}, ${JSON.stringify(
      mutation.data,
    )}`,
  )
  const updatePost = async (_e) => {
    // e.preventDefault()
    try {
      await mutation.mutate({
        postId: id,
        body: postDetailsState,
      })
    } catch (error) {
      console.log(`There was an error!! with message: ${error.message}`)
    }
  }

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
    return 'There was ERROR fetching post Details!!!'
  }

  return (
    <div>
      {isFetching && <Progress hasStripe value={100} />}
      <Table>
        <TableCaption>
          <h4>Details of post with id: {id}</h4>

          <Button onClick={() => history.goBack()}>Go Back to List Page</Button>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Post Id</Th>
            <Th>Post Title</Th>
            <Th>Post Body</Th>
            <Th>Update Post</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr key={`${data.id}`}>
            <Td>{data.id}</Td>

            <Td>
              {data.title}
              <input
                type="text"
                onChange={onChangeHandler}
                name="title"
                value={postDetailsState.title}
              />
            </Td>

            <Td>
              {data.body}
              <input
                type="text"
                name="body"
                onChange={onChangeHandler}
                value={postDetailsState.body}
              />
            </Td>

            <Td>
              <Button onClick={updatePost} isDisabled={mutation.isLoading}>
                Update
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </div>
  )
}
