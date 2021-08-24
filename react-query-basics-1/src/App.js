import { useContext } from 'react'

import './App.css'
import { Redirect, Route, Switch } from 'react-router-dom'
import PostList from './pages/PostList'
import { Box, Switch as ChakraSwitch } from '@chakra-ui/react'
import { AppContext } from './context/AppContext'
import { PostDetails } from './pages/PostDetails'
import { Home } from './pages/Home'

function App() {
  const { showErrorExample, setShowErrorExample } = useContext(AppContext)

  return (
    <>
      <ChakraSwitch
        style={{
          position: 'fixed',
          top: '15%',
          right: '10%',
        }}
        colorScheme="red"
        onChange={() => setShowErrorExample(!showErrorExample)}
      >
        Show Error Example?
      </ChakraSwitch>

      <Box
        border="2px"
        borderColor="red.400"
        borderRadius="lg"
        bg="teal.100"
        my="20%"
        mx="10%"
      >
        <div className="App">
          <Switch>
            <Route path={'/'} exact component={Home} />
            <Route path={'/posts'} exact component={PostList} />
            <Route path={'/posts/:id'} component={PostDetails} />
            <Redirect to={'/'} />
          </Switch>
        </div>
      </Box>
    </>
  )
}

export default App
