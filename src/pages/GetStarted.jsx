import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { uploadCv } from '../lib/api'
import StepHeader from '../components/get-started/StepHeader'
import StepProgress from '../components/get-started/StepProgress'
import ContactStep from '../components/get-started/ContactStep'
import UploadStep from '../components/get-started/UploadStep'
import SuccessState from '../components/get-started/SuccessState'

const ease = [0.16, 1, 0.3, 1]

function GetStarted() {
  const [step, setStep] = useState(1) // 1 | 2 | 'success'
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [file, setFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const reduce = useReducedMotion()
  const abortRef = useRef(null)

  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  async function handleVerify() {
    if (!file) return

    setIsSubmitting(true)
    setSubmitError('')

    const controller = new AbortController()
    abortRef.current = controller

    try {
      await uploadCv(file, { signal: controller.signal })
      setIsSubmitting(false)
      setStep('success')
    } catch (err) {
      if (err.name === 'AbortError') return
      setIsSubmitting(false)
      setSubmitError('Something went wrong while verifying your CV. Please try again.')
    }
  }

  return (
    <div className="min-h-dvh bg-ink">
      <StepHeader />
      <main className="mx-auto max-w-xl px-6 py-16 lg:py-24">
        {step !== 'success' && <StepProgress step={step} />}

        <AnimatePresence mode="wait" initial={false}>
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={reduce ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? {} : { opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease }}
            >
              <ContactStep
                name={name}
                phone={phone}
                onNameChange={(e) => setName(e.target.value)}
                onPhoneChange={(e) => setPhone(e.target.value)}
                onContinue={() => setStep(2)}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? {} : { opacity: 0, x: 24 }}
              transition={{ duration: 0.35, ease }}
            >
              <UploadStep
                file={file}
                onFileSelect={setFile}
                onFileRemove={() => setFile(null)}
                onBack={() => setStep(1)}
                onVerify={handleVerify}
                isSubmitting={isSubmitting}
                submitError={submitError}
              />
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <SuccessState name={name} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default GetStarted
