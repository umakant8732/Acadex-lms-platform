// Loads Razorpay checkout script only when payment starts.
export const loadRazorpaySdk = (): Promise<boolean> => {
  return new Promise<boolean>(resolve => {
    if ((window as any).Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true

    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)

    document.body.appendChild(script)
  })
}
