export function Footer() {
  return (
    <footer className="border-t border-[#e7e2d7] bg-[#f2eee3] py-10">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="font-display text-sm font-extrabold text-[#23201d]">
              DESIGN WEBSITE PSAJ MATEMATIKA
            </p>
            <p className="mt-1 text-xs text-[#746e63]">
              Pendidikan bukanlah sebuah hak istimewa, melainkan kemungkinan yang layak didapatkan oleh setiap anak bangsa.
            </p>
          </div>

          <div className="text-xs text-[#746e63]">
            Sumber Data: <strong className="text-[#23201d]">Badan Pusat Statistik (BPS 2025)</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
