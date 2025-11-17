"use client";

import { useState } from "react";
import { usePCBuilder } from "@/scripts/hitung-ps";

const parts = {
  cpu: [
    { name: "Intel Core i5-12400F", watt: 65 },
    { name: "Intel Core i7-12700K", watt: 125 },
    { name: "AMD Ryzen 5 5600X", watt: 65 },
    { name: "AMD Ryzen 7 5800X", watt: 105 },
  ],
  gpu: [
    { name: "NVIDIA RTX 3060", watt: 170 },
    { name: "NVIDIA RTX 3070", watt: 220 },
    { name: "AMD RX 6700 XT", watt: 230 },
    { name: "AMD RX 6800", watt: 250 },
  ],
  ram: [
    { name: "Corsair Vengeance 16GB DDR4", watt: 5 },
    { name: "G.Skill Trident Z 32GB DDR4", watt: 10 },
    { name: "Kingston Fury 16GB DDR5", watt: 8 },
  ],
  motherboard: [
    { name: "ASUS ROG Strix B550", watt: 80 },
    { name: "MSI MAG B660M", watt: 70 },
    { name: "Gigabyte B550 AORUS", watt: 75 },
  ],
  ssd: [
    { name: "Samsung 970 EVO 500GB", watt: 5 },
    { name: "WD Black SN850 1TB", watt: 7 },
    { name: "Crucial P5 Plus 1TB", watt: 6 },
  ],
  casing: [
    { name: "NZXT H510", watt: 10 },
    { name: "Corsair 4000D", watt: 12 },
    { name: "Lian Li O11 Dynamic", watt: 15 },
  ],
  cooler: [
    { name: "Cooler Master Hyper 212", watt: 5 },
    { name: "Noctua NH-D15", watt: 3 },
    { name: "NZXT Kraken X63", watt: 15 },
  ],
};

export default function ComponentPicker() {
  const [cpu, setCPU] = useState("");
  const [gpu, setGPU] = useState("");
  const [ram, setRAM] = useState("");
  const [ssd, setSSD] = useState("");
  const [motherboard, setMotherboard] = useState("");
  const [casing, setCasing] = useState("");
  const [cooler, setCooler] = useState("");

  const [result, setResult] = useState<any>(null);

  function calculatePSU() {
    const total =
      (parts.cpu.find((x) => x.name === cpu)?.watt || 0) +
      (parts.gpu.find((x) => x.name === gpu)?.watt || 0) +
      (parts.ram.find((x) => x.name === ram)?.watt || 0) +
      (parts.ssd.find((x) => x.name === ssd)?.watt || 0) +
      (parts.motherboard.find((x) => x.name === motherboard)?.watt || 0) +
      (parts.casing.find((x) => x.name === casing)?.watt || 0) +
      (parts.cooler.find((x) => x.name === cooler)?.watt || 0);

    const recommended = Math.round(total * 1.5);

    setResult({
      totalWatt: total,
      recommendedPSU: recommended,
    });
  }

  const { saveBuild } = usePCBuilder();

  function handleSave() {
    const build = {
      cpu,
      gpu,
      ram,
      ssd,
      motherboard,
      casing,
      cooler,
      totalWatt: result.totalWatt,
      recommendedPSU: result.recommendedPSU,
    };

    saveBuild(build);
    alert("Build berhasil disimpan!");
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-dark">
            <div className="card-body p-4">
              <h2 className="card-title mb-4">Pilih Komponen PC</h2>

              {[
                ["CPU", cpu, setCPU, parts.cpu],
                ["GPU", gpu, setGPU, parts.gpu],
                ["RAM", ram, setRAM, parts.ram],
                ["Motherboard", motherboard, setMotherboard, parts.motherboard],
                ["SSD", ssd, setSSD, parts.ssd],
                ["Casing", casing, setCasing, parts.casing],
                ["Cooler", cooler, setCooler, parts.cooler],
              ].map(([label, value, setValue, list]) => (
                <div className="mb-3" key={label as string}>
                  <label className="form-label fw-semibold">{label}</label>
                  <select
                    className="form-select"
                    value={value as string}
                    onChange={(e) => (setValue as any)(e.target.value)}
                  >
                    <option value="">-- pilih {label} --</option>
                    {(list as any).map((p: any) => (
                      <option key={p.name} value={p.name}>
                        {p.name} ({p.watt}W)
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {result && (
                <div className="alert alert-light border mt-4">
                  <h5 className="alert-heading">Hasil Perhitungan</h5>
                  <hr />
                  <p className="mb-2">
                    <strong>Total Watt:</strong> {result.totalWatt}W
                  </p>
                  <p className="mb-0">
                    <strong>Rekomendasi PSU:</strong> {result.recommendedPSU}W
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn btn-outline-dark" onClick={calculatePSU}>
              Hitung PSU
            </button>

            {result && (
              <button className="btn btn-outline-dark" onClick={handleSave}>
                Simpan Build Ini
              </button>
            )}

            <a href="/" className="btn btn-outline-secondary">
              Kembali
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
