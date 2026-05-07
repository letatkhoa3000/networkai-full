import Header from '@/components/Header'
import ContactForm from '@/components/ContactForm'
import { ContactPageCopy } from '@/lib/contact-content'

export default function ContactPageContent({
  copy,
  email,
  phone,
  address,
}: {
  copy: ContactPageCopy
  email: string
  phone?: string
  address: string
}) {
  return (
    <>
      <Header locale={copy.locale} switchPath="/contact" />
      <main className="pt-[78px]">
        <section className="page-hero relative overflow-hidden py-10 sm:py-12 lg:py-16">
          <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-[#2f6fff]/10 blur-3xl" />
          <div className="page-shell">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
              <div className="max-w-5xl animate-fade-up">
                <p className="section-tag mb-4">
                  {copy.pageTag}
                </p>
                <h1 className="page-heading mb-5 max-w-[16ch]">
                  {copy.title.leading}
                  <br />
                  <span className="text-[#0f5bff]">{copy.title.accent}</span>
                </h1>
                <p className="section-body mb-10 max-w-[60ch]">
                  {copy.description}
                </p>

                <div className="space-y-5">
                  <div className="flex items-start gap-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
                    <div className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#edf4ff]">
                      <svg className="h-4 w-4 text-[#0f5bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-wider text-slate-400">
                        {copy.contactLabels.email}
                      </p>
                      <p className="font-600 text-slate-950">{email}</p>
                    </div>
                  </div>

                  {phone ? (
                    <div className="flex items-start gap-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
                      <div className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#edf4ff]">
                        <svg className="h-4 w-4 text-[#0f5bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="mb-1 text-xs uppercase tracking-wider text-slate-400">
                          {copy.contactLabels.phone}
                        </p>
                        <p className="font-600 text-slate-950">{phone}</p>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex items-start gap-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
                    <div className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#edf4ff]">
                      <svg className="h-4 w-4 text-[#0f5bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-wider text-slate-400">
                        {copy.contactLabels.address}
                      </p>
                      <p className="leading-7 text-slate-700">{address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-fade-up animate-delay-100">
                <ContactForm copy={copy.form} locale={copy.locale} serviceOptions={copy.serviceOptions} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
