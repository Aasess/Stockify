// toastHelper.js
import { toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const displayToast = (message, type) => {
  const options = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  }

  if (type === 'success') {
    toast.success(message, options)
  } else if (type === 'error') {
    toast.error(message, options)
  } else {
    toast.info(message, options) // Default to info type if no specific type is provided
  }
}

export default displayToast
