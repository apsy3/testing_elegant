export const metadata = { title: "Contact — Elegance Threads" };
export default function Page(){
  return (
    <main className="container py-10">
      <h1 className="h2 mb-2">Contact</h1>
      <p className="text-bone/90">Write to hello@elegancethreads.example — demo form below.</p>
      <form className="mt-6 grid gap-3 md:w-1/2"><input className="bg-[#161616] p-3 rounded-xl border border-white/15" placeholder="Your email" /><textarea className="bg-[#161616] p-3 rounded-xl border border-white/15" rows="4" placeholder="Message"></textarea><button className="btn btn-solid w-fit">Send (demo)</button></form>
    </main>
  )
}
