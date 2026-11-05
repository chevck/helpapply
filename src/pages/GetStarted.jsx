import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { saveCv, upgradeCv, uploadCv } from "../lib/api";
import { AUTH_REASON, AUTH_STATUS } from "../lib/auth";
import { fileStem } from "../lib/cvDownload";
import {
  clearPendingSave,
  readPendingSave,
  stashPendingSave,
} from "../lib/pendingSave";
import { STEP } from "../lib/steps";
import { useAuth } from "../hooks/useAuth";
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
  const [pending] = useState(readPendingSave);
  const [step, setStep] = useState(pending ? STEP.PREVIEW : STEP.CONTACT);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(pending?.result ?? null);
  const [upgradedCv, setUpgradedCv] = useState(pending?.upgradedCv ?? null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const reduce = useReducedMotion();
  const abortRef = useRef(null);
  const toast = useToast();
  const { status, openAuthModal } = useAuth();

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const performSave = useCallback(
    async ({ result: savedResult, upgradedCv: savedCv }) => {
      setIsSaving(true);
      try {
        await saveCv({
          title: fileStem(savedResult.fileName),
          level: savedResult.review.level,
          content: savedCv,
        });
        toast.success("Saved to your dashboard.");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsSaving(false);
      }
    },
    [toast],
  );

  useEffect(() => {
    if (status !== AUTH_STATUS.AUTHENTICATED) return;
    const stashed = readPendingSave();
    if (!stashed) return;
    clearPendingSave();
    queueMicrotask(() => performSave(stashed));
  }, [status, performSave]);

  function handleSave() {
    const payload = { result, upgradedCv };
    if (status === AUTH_STATUS.AUTHENTICATED) {
      performSave(payload);
      return;
    }
    stashPendingSave(payload);
    openAuthModal({ reason: AUTH_REASON.SAVE });
  }

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
                onSave={handleSave}
                isSaving={isSaving}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default GetStarted;
