import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'

function isMobile() {
  return window.innerWidth < 768
}

function App() {
  const [dimensions, setDimensions] = useState({
    width: isMobile() ? '100%' : '50%',
    height: isMobile() ? '50%' : '100%',
  })
  const [code, setCode] = useState('')

  const handleResize = () => {
    setDimensions({
      width: isMobile() ? '100%' : '50%',
      height: isMobile() ? '50%' : '100%',
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchTemplate = async () => {
      const response = await fetch('/template.html')
      const data = await response.text()

      setCode(data)
    }

    fetchTemplate()
  }, [])

  return (
    <div className="flex h-full flex-col md:flex-row">
      <Editor
        defaultLanguage="html"
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
        width={dimensions.width}
        height={dimensions.height}
      />

      <iframe className="h-1/2 md:h-full md:w-1/2" srcDoc={code}></iframe>
    </div>
  )
}

export default App
