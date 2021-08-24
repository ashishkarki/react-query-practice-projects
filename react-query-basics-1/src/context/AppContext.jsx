import { createContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

export const AppContext = createContext(undefined)

export const AppProvider = ({ children }) => {
  const [showErrorExample, setShowErrorExample] = useState(false)
  const history = useHistory()

  return (
    <AppContext.Provider
      value={{ history, showErrorExample, setShowErrorExample }}
    >
      {children}
    </AppContext.Provider>
  )
}
