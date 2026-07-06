import { toast } from 'react-hot-toast'

type ToastMessage = string

export const showSuccess = (message: ToastMessage): void => {
  toast.success(message)
}

export const showError = (message: ToastMessage): void => {
  toast.error(message)
}

export const showInfo = (message: ToastMessage): void => {
  toast(message)
}
