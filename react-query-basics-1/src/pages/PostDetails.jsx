import { useQuery } from 'react-query'
import { useContext, useState } from 'react'
import * as constants from '../constants'
import { GetOnePostDetails } from '../backend/Queries'
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
  const { history } = useContext(AppContext)

  const [postDetails, setPostDetails] = useState({
    title: '',
    body: '',
  })

  const { id } = props.match.params
  const { isLoading, isFetching, data, isError } = useQuery(
    [constants.QUERY_KEYS.POSTS, { postId: id }],
    GetOnePostDetails,
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setPostDetails({
          title: data.title,
          body: data.body,
        })
      },
    },
  )

  const onChangeHandler = (e) => {
    e.persist()

    setPostDetails((existingDetails) => ({
      ...existingDetails,
      [e.target.name]: e.target.value,
    }))
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
                value={postDetails.title}
              />
            </Td>

            <Td>
              {data.body}
              <input
                type="text"
                name="body"
                onChange={onChangeHandler}
                value={postDetails.body}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </div>
  )
}
