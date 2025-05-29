import { useState, useEffect, useCallback } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faExchangeAlt, 
  faCopy, 
  faTrash, 
  faSpinner,
  faArrowRight,
  faArrowLeft,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [debounceEnabled, setDebounceEnabled] = useState(false)
  const [debouncedInputText, setDebouncedInputText] = useState('')

  // Setup debounce effect
  useEffect(() => {
    if (!debounceEnabled) {
      setDebouncedInputText(inputText)
      return
    }
    
    const timerId = setTimeout(() => {
      setDebouncedInputText(inputText)
    }, 600)

    return () => {
      clearTimeout(timerId)
    }
  }, [inputText, debounceEnabled])

  // Auto-encode/decode when debounce is enabled
  useEffect(() => {
    if (debounceEnabled && debouncedInputText) {
      handleAutoProcess()
    }
  }, [debouncedInputText, debounceEnabled])

  const handleAutoProcess = useCallback(async () => {
    // Skip if already loading or no text
    if (isLoading || !debouncedInputText.trim()) return
    
    // Try to decode first (if it has any of our symbols)
    const hasSymbols = /[αβ¢δεϝɡ♄ιʆκλɱη☺ρφяѕτυνωхγζΑΒΔΕΙΚΛΦΩ]/u.test(debouncedInputText)
    
    if (hasSymbols) {
      handleDecode()
    } else {
      handleEncode()
    }
  }, [debouncedInputText, isLoading])

  const handleInputChange = (e) => {
    const text = e.target.value
    setInputText(text)
    setCharCount([...text].length) // Count Unicode code points correctly
  }

  const handleEncode = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to encode')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/encode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        handleApiError(data)
        return
      }
      
      setOutputText(data.encoded)
      if (!debounceEnabled) {
        toast.success('Text encoded successfully!')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDecode = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to decode')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/decode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ encoded: inputText }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        handleApiError(data)
        return
      }
      
      setOutputText(data.text)
      if (!debounceEnabled) {
        toast.success('Text decoded successfully!')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleApiError = (data) => {
    switch (data.code) {
      case 'INPUT_TOO_LONG':
        toast.error('Message exceeds 280 characters.')
        break
      case 'UNSUPPORTED_CONTROL_CHAR':
        toast.error('Input contains unsupported control characters.')
        break
      case 'UNKNOWN_SYMBOL':
        toast.error('Encoded text contains unknown symbols.')
        break
      default:
        toast.error('Server error. Please try again.')
    }
  }

  const handleSwap = () => {
    const temp = inputText
    setInputText(outputText)
    setOutputText(temp)
    setCharCount([...outputText].length)
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
    setCharCount(0)
  }

  const copyToClipboard = () => {
    if (!outputText) {
      toast.info('Nothing to copy!')
      return
    }
    
    navigator.clipboard.writeText(outputText)
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy. Please try manually.'))
  }

  const toggleDebounce = () => {
    setDebounceEnabled(!debounceEnabled)
    if (!debounceEnabled) {
      toast.info('Auto-encode/decode enabled')
    }
  }

  return (
    <div className="app-container">
      <h1>Symbol Cipher Tool</h1>
      
      <div className="cipher-container">
        <div className="input-section">
          <div className="textarea-header">
            <label htmlFor="inputText">Input</label>
            <div className="counter-info">
              <span className={charCount > 250 ? 'count-warn' : ''}>
                {charCount}
              </span>
              <span className="count-max">/280</span>
            </div>
          </div>
          <textarea
            id="inputText"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type or paste text here..."
            className={charCount > 280 ? 'error-border' : ''}
            wrap="soft"
          />
          <div className="textarea-actions">
            <button 
              className="icon-btn"
              onClick={handleClear}
              title="Clear"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        
        <div className="center-controls">
          <button 
            className="action-btn encode-btn"
            onClick={handleEncode} 
            disabled={isLoading || charCount > 280 || !inputText.trim()}
          >
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <>
                Encode <FontAwesomeIcon icon={faArrowRight} />
              </>
            )}
          </button>
          <button 
            className="action-btn decode-btn"
            onClick={handleDecode} 
            disabled={isLoading || charCount > 280 || !inputText.trim()}
          >
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <>
                <FontAwesomeIcon icon={faArrowLeft} /> Decode
              </>
            )}
          </button>
          <button 
            className="icon-btn swap-btn"
            onClick={handleSwap} 
            disabled={isLoading || !outputText}
            title="Swap input and output"
          >
            <FontAwesomeIcon icon={faExchangeAlt} />
          </button>
          
          <div className="toggle-container">
            <label className="toggle">
              <input 
                type="checkbox" 
                checked={debounceEnabled}
                onChange={toggleDebounce}
              />
              <span className="toggle-slider"></span>
            </label>
            <span>Auto</span>
            <div className="tooltip">
              <FontAwesomeIcon icon={faInfoCircle} />
              <span className="tooltip-text">
                Auto-encode/decode as you type
              </span>
            </div>
          </div>
        </div>
        
        <div className="output-section">
          <div className="textarea-header">
            <label htmlFor="outputText">Output</label>
          </div>
          <textarea
            id="outputText"
            value={outputText}
            readOnly
            placeholder="Result will appear here..."
            wrap="soft"
          />
          <div className="textarea-actions">
            <button 
              className="icon-btn"
              onClick={copyToClipboard} 
              disabled={!outputText}
              title="Copy to clipboard"
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="footer">
        <p>Unicode Cipher - Encode and decode text using special symbols</p>
      </div>
      
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
