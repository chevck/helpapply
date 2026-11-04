import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { upgradeCv, uploadCv } from "../lib/api";
import { STEP } from "../lib/steps";
import { useToast } from "../hooks/useToast";
import StepHeader from "../components/get-started/StepHeader";
import StepProgress from "../components/get-started/StepProgress";
import ContactStep from "../components/get-started/ContactStep";
import UploadStep from "../components/get-started/UploadStep";
import SuccessState from "../components/get-started/SuccessState";
import ResultView from "../components/get-started/ResultView";
import CvPreview from "../components/get-started/CvPreview";

const ease = [0.16, 1, 0.3, 1];

function GetStarted() {
  const [step, setStep] = useState(STEP.CONTACT);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [upgradedCv, setUpgradedCv] = useState(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
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
        setStep(STEP.RESULT);
      } else {
        toast.error(
          response?.message || "We couldn't verify your CV. Please try again.",
        );
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      setIsSubmitting(false);
      toast.error(err.message);
    }
  }

  async function handleUpgrade() {
    setIsUpgrading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await upgradeCv(
        {
          text: result.text,
          level: result.review.level,
          improvements: result.review.fixes,
        },
        { signal: controller.signal },
      );
      setIsUpgrading(false);

      if (response?.success && response.data?.upgradedCv) {
        setUpgradedCv(response.data.upgradedCv);
        setStep(STEP.PREVIEW);
      } else {
        toast.error(
          response?.message || "We couldn't update your CV. Please try again.",
        );
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      setIsUpgrading(false);
      toast.error(err.message);
    }
  }

  return (
    <div className='min-h-dvh bg-ink'>
      <StepHeader />
      <main className='mx-auto max-w-xl px-6 py-16 lg:py-24'>
        {(step === STEP.CONTACT || step === STEP.UPLOAD) && (
          <StepProgress step={step} />
        )}

        <AnimatePresence mode='wait' initial={false}>
          {step === STEP.CONTACT && (
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
                onContinue={() => setStep(STEP.UPLOAD)}
              />
            </motion.div>
          )}

          {step === STEP.UPLOAD && (
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
                onBack={() => setStep(STEP.CONTACT)}
                onVerify={handleVerify}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          )}

          {step === STEP.RESULT && (
            <motion.div
              key='success'
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              {result?.review ? (
                <ResultView
                  result={result}
                  onUpgrade={handleUpgrade}
                  isUpgrading={isUpgrading}
                />
              ) : (
                <SuccessState name={name} />
              )}
            </motion.div>
          )}

          {step === STEP.PREVIEW && (
            <motion.div
              key='preview'
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <CvPreview
                cv={upgradedCv}
                fileName={result.fileName}
                onBack={() => setStep(STEP.RESULT)}
                onRegenerate={handleUpgrade}
                isRegenerating={isUpgrading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default GetStarted;
