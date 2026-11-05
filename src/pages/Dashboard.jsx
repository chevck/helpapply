import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteSavedCv, getSavedCv, listSavedCvs } from '../lib/api'
import { AUTH_REASON, AUTH_STATUS } from '../lib/auth'
import { downloadPdf, downloadText } from '../lib/cvDownload'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import Nav from '../components/Nav'
import SavedCvList from '../components/dashboard/SavedCvList'
import SavedCvViewer from '../components/dashboard/SavedCvViewer'

function Dashboard() {
  const { status, openAuthModal } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [savedCvs, setSavedCvs] = useState(null)
  const [openId, setOpenId] = useState(null)
  const [busyId, setBusyId] = useState(null)

  useEffect(() => {
    if (status !== AUTH_STATUS.ANONYMOUS) return
    openAuthModal({ reason: AUTH_REASON.DASHBOARD })
    navigate('/', { replace: true })
  }, [status, openAuthModal, navigate])

  useEffect(() => {
    if (status !== AUTH_STATUS.AUTHENTICATED) return
    const controller = new AbortController()
    listSavedCvs({ signal: controller.signal })
      .then((response) => setSavedCvs(response.data.savedCvs))
      .catch((err) => {
        if (err.name === 'AbortError') return
        toast.error(err.message)
        setSavedCvs([])
      })
    return () => controller.abort()
  }, [status, toast])

  const closeViewer = useCallback(() => setOpenId(null), [])

  async function download(summaryOrCv, save) {
    setBusyId(summaryOrCv.id)
    try {
      const { content } =
        summaryOrCv.content === undefined
          ? (await getSavedCv(summaryOrCv.id)).data.savedCv
          : summaryOrCv
      await save(content, summaryOrCv.title)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(savedCv) {
    if (!window.confirm(`Delete "${savedCv.title}"? This can't be undone.`)) return
    setBusyId(savedCv.id)
    try {
      await deleteSavedCv(savedCv.id)
      setSavedCvs((current) => current.filter((item) => item.id !== savedCv.id))
      toast.success('CV deleted.')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="min-h-dvh bg-ink">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        {status === AUTH_STATUS.AUTHENTICATED && openId ? (
          <SavedCvViewer
            id={openId}
            onBack={closeViewer}
            onDownloadText={(cv) => download(cv, downloadText)}
            onDownloadPdf={(cv) => download(cv, downloadPdf)}
          />
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="font-display text-3xl font-semibold uppercase tracking-tight text-paper">
                Your saved CVs
              </h1>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="rounded-full bg-paper px-5 py-3 text-[15px] font-medium text-ink disabled:opacity-40"
              >
                Find job
              </button>
            </div>
            {status === AUTH_STATUS.AUTHENTICATED && savedCvs && (
              <SavedCvList
                savedCvs={savedCvs}
                busyId={busyId}
                onOpen={setOpenId}
                onDownloadText={(cv) => download(cv, downloadText)}
                onDownloadPdf={(cv) => download(cv, downloadPdf)}
                onDelete={handleDelete}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard
