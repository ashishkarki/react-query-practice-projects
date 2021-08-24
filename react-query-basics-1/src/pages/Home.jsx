import { useContext } from 'react'

import { Button } from '@chakra-ui/react'
import { AppContext } from '../context/AppContext'

export const Home = () => {
  const { history } = useContext(AppContext)

  return (
    <>
      <h2> HOME page </h2>

      <Button
        colorScheme="teal"
        variant="ghost"
        onClick={history.push(`/posts/`)}
      >
        View all Posts
      </Button>
    </>
  )
}
