"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usePCBuilder, Build } from "@/scripts/hitung-ps";

export default function BuildDetail() {
  const router = useRouter();
  const params = useParams();
  const { getBuild, updateBuild } = usePCBuilder();
  const [build, setBuild] = useState<Build | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    if (params.id) {
      getBuild(params.id as string)
        .then((data) => {
          if (data) {
            setBuild(data);
            setName(data.name || "");
          }
        })
        .catch((error) => {
          console.error("Failed to fetch build:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [params.id, getBuild]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (build) {
      await updateBuild(build.id, { name });
      alert("Build updated successfully!");
      router.push("/components/saved");
    }
  }

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (!build) {
    return <div className="container mt-5">Build tidak ditemukan.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Detail Build</h2>

      <form onSubmit={handleUpdate}>
        <ul className="list-group">
          <li className="list-group-item">CPU: {build.cpu}</li>
          <li className="list-group-item">GPU: {build.gpu}</li>
          <li className="list-group-item">RAM: {build.ram}</li>
          <li className="list-group-item">SSD: {build.ssd}</li>
          <li className="list-group-item">Motherboard: {build.motherboard}</li>
          <li className="list-group-item">Casing: {build.casing}</li>
          <li className="list-group-item">Cooler: {build.cooler}</li>
        </ul>

        <div className="mt-3">
          <p>
            <b>Total Watt:</b> {build.totalWatt}W
          </p>
          <p>
            <b>PSU Rekomendasi:</b> {build.recommendedPSU}W
          </p>
        </div>
        <button
          type="button"
          className="btn btn-dark ms-2"
          onClick={() => router.push("/components/saved")}
        >
          Kembali
        </button>
      </form>
    </div>
  );
}
