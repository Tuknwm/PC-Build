"use client";
import Link from "next/link";
import { usePCBuilder } from "@/scripts/hitung-ps";

export default function SavedBuilds() {
  const { builds, deleteBuild } = usePCBuilder();

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Build Tersimpan</h2>

      {builds.length === 0 && <p>Belum ada build.</p>}

      <div className="row g-4">
        {builds.map((b) => (
          <div key={b.id} className="col-12 col-md-6">
            <div
              className="card p-3 shadow-sm border-dark"
              style={{ borderRadius: "12px" }}
            >
              <h4 className="fw-bold">
                {b.cpu} + {b.gpu}
              </h4>
              <p>Total Watt: {b.totalWatt}W</p>
              <p>PSU Rekomendasi: {b.recommendedPSU}W</p>

              <div className="d-flex gap-2 mt-2">
                <Link
                  href={`/components/saved/${b.id}`}
                  className="btn btn-dark flex-fill"
                >
                  Detail
                </Link>

                <button
                  className="btn btn-outline-danger flex-fill"
                  onClick={() => deleteBuild(b.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
