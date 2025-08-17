export const metadata = { title: "Contact — Elegance Threads" };
export default function Page(){
  return (
    <main className="container py-10">
      <h1 className="h2 mb-2">Contact</h1>
      <div className="whitespace-pre-line text-bone/90">Have a question or feedback? Email us: hello@elegancethreads.example or use the form below (demo).</div>
      <form className="mt-6 grid gap-3 md:w-1/2"><input className="bg-[#161616] p-3 rounded-xl border border-white/15" placeholder="Your email" /><textarea className="bg-[#161616] p-3 rounded-xl border border-white/15" rows="4" placeholder="Message"></textarea><button className="btn btn-solid w-fit">Send (demo)</button></form>
    </main>
  )
}
