import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { uploadCv } from "../lib/api";
import { useToast } from "../hooks/useToast";
import StepHeader from "../components/get-started/StepHeader";
import StepProgress from "../components/get-started/StepProgress";
import ContactStep from "../components/get-started/ContactStep";
import UploadStep from "../components/get-started/UploadStep";
import SuccessState from "../components/get-started/SuccessState";
import ResultView from "../components/get-started/ResultView";

const ease = [0.16, 1, 0.3, 1];

function GetStarted() {
  const [step, setStep] = useState(1); // 1 | 2 | 'success'
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const reduce = useReducedMotion();
  const abortRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function handleVerify() {
    if (!file) return;

    setIsSubmitting(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await uploadCv(file, experience, {
        signal: controller.signal,
      });
      setIsSubmitting(false);

      if (response?.success) {
        setResult(response.data);
        setStep("success");
      } else {
        toast.error(
          response?.message || "We couldn't verify your CV. Please try again.",
        );
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      setIsSubmitting(false);
      toast.error(
        "Something went wrong while verifying your CV. Please try again.",
      );
    }
  }

  return (
    <div className='min-h-dvh bg-ink'>
      <StepHeader />
      <main className='mx-auto max-w-xl px-6 py-16 lg:py-24'>
        {step !== "success" && <StepProgress step={step} />}

        <AnimatePresence mode='wait' initial={false}>
          {step === 1 && (
            <motion.div
              key='step-1'
              initial={reduce ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? {} : { opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease }}
            >
              <ContactStep
                name={name}
                phone={phone}
                experience={experience}
                onNameChange={(e) => setName(e.target.value)}
                onPhoneChange={(e) => setPhone(e.target.value)}
                onExperienceChange={(e) => setExperience(e.target.value)}
                onContinue={() => setStep(2)}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key='step-2'
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
              />
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key='success'
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              {result?.scoring ? (
                <ResultView result={result} />
              ) : (
                <SuccessState name={name} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default GetStarted;
