import Link from "next/link";

export default function Home() {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card border-secondary">
          <div className="card-body p-4">
            <div className="mb-3 pb-3 border-bottom">
              <p className="mb-2">
                <strong>Nama:</strong> Joe Nickson Lie
              </p>
              <p className="mb-0">
                <strong>NIM:</strong> 535240079
              </p>
            </div>

            <div>
              <p className="mb-0">
                <strong>Topik:</strong> Menghitung daya penggunaan komponen pc
                dan memberikan rokemendasi watt psu yang terbaik.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 d-flex gap-3 justify-content-center flex-wrap">
          <Link href="/components" className="btn btn-outline-dark">
            Mulai Rakit PC
          </Link>
          <Link href="/components/saved" className="btn btn-outline-dark">
            Lihat Build Tersimpan
          </Link>
          <Link href="/games" className="btn btn-outline-dark">
            Lihat Api games
          </Link>
        </div>
      </div>
    </div>
  );
}
