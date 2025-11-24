"use client";

import { useState } from "react";
import { usePCBuilder } from "@/scripts/hitung-ps";

const parts = {
  cpu: [
    { name: "Intel Core i9-14900K", watt: 125 },
    { name: "AMD Ryzen 7 7800X3D", watt: 120 },
    { name: "Intel Core i7-13700K", watt: 125 },
    { name: "AMD Ryzen 7 5800X3D", watt: 105 },
    { name: "Intel Core i5-12400F", watt: 65 },
    { name: "AMD Ryzen 5 5600X", watt: 65 },
    { name: "Intel Core i3-13100F", watt: 58 },
    { name: "AMD Ryzen 9 7950X", watt: 170 },
    { name: "Intel Core i5-14600K", watt: 125 },
    { name: "AMD Ryzen 3 4100", watt: 65 },
  ],
  gpu: [
    { name: "NVIDIA RTX 4090", watt: 450 },
    { name: "AMD RX 7900 XTX", watt: 355 },
    { name: "NVIDIA RTX 4070 Ti SUPER", watt: 285 },
    { name: "AMD RX 6800", watt: 250 },
    { name: "NVIDIA RTX 3070", watt: 220 },
    { name: "AMD RX 6600 XT", watt: 160 },
    { name: "NVIDIA RTX 3050", watt: 130 },
    { name: "NVIDIA GTX 1660 Super", watt: 125 },
    { name: "NVIDIA RTX 4060", watt: 115 },
    { name: "AMD RX 580 8GB", watt: 185 },
  ],
  ram: [
    { name: "Corsair Dominator 64GB DDR5 (2x32GB)", watt: 15 },
    { name: "G.Skill Trident Z 32GB DDR4 (2x16GB)", watt: 10 },
    { name: "Kingston Fury 16GB DDR5 (2x8GB)", watt: 8 },
    { name: "Corsair Vengeance 16GB DDR4 (2x8GB)", watt: 5 },
    { name: "Crucial Ballistix 8GB DDR4 (Single)", watt: 3 },
    { name: "HyperX Fury 32GB DDR4 (2x16GB)", watt: 12 },
    { name: "TeamGroup T-Force 16GB DDR4 (2x8GB)", watt: 5 },
    { name: "PNY XLR8 8GB DDR4 (Single)", watt: 3 },
    { name: "G.Skill Flare X5 32GB DDR5 (2x16GB)", watt: 10 },
    { name: "Crucial Pro 64GB DDR5 (2x32GB)", watt: 15 },
  ],
  motherboard: [
    { name: "ASUS ROG Z790 HERO", watt: 90 },
    { name: "MSI MAG B660M MORTAR", watt: 70 },
    { name: "ASUS ROG Strix B550-F", watt: 80 },
    { name: "Gigabyte B550 AORUS ELITE", watt: 75 },
    { name: "MSI PRO X670-P WIFI", watt: 95 },
    { name: "ASRock B760M Steel Legend", watt: 70 },
    { name: "Gigabyte Z690 Gaming X", watt: 85 },
    { name: "ASUS PRIME A620M-K", watt: 60 },
    { name: "MSI B450 Tomahawk MAX", watt: 65 },
    { name: "Gigabyte X670E AORUS Master", watt: 100 },
  ],
  ssd: [
    { name: "Samsung 990 Pro 2TB NVMe", watt: 8 },
    { name: "WD Black SN850X 1TB NVMe", watt: 7 },
    { name: "Crucial P5 Plus 1TB NVMe", watt: 6 },
    { name: "Samsung 970 EVO 500GB NVMe", watt: 5 },
    { name: "Kingston NV2 250GB NVMe", watt: 3 },
    { name: "Crucial MX500 1TB SATA", watt: 4 },
    { name: "WD Green 480GB SATA", watt: 3 },
    { name: "Samsung 870 EVO 500GB SATA", watt: 4 },
    { name: "Adata Legend 850 Lite 1TB NVMe", watt: 6 },
    { name: "PNY CS2140 2TB NVMe", watt: 7 },
  ],
  casing: [
    { name: "Lian Li O11 Dynamic EVO", watt: 15 },
    { name: "Corsair 4000D Airflow", watt: 12 },
    { name: "NZXT H7 Flow", watt: 10 },
    { name: "Fractal Design Meshify 2", watt: 10 },
    { name: "Cooler Master MasterBox Q300L (M-ATX)", watt: 8 },
    { name: "Phanteks Eclipse G360A", watt: 12 },
    { name: "Be Quiet! Pure Base 500DX", watt: 10 },
    { name: "NZXT H5 Flow", watt: 10 },
    { name: "Thermaltake Core P3", watt: 15 },
    { name: "DeepCool Matrexx 55 Mesh", watt: 10 },
  ],
  cooler: [
    { name: "Corsair iCUE H150i (AIO 360mm)", watt: 20 },
    { name: "Noctua NH-D15 (Air Cooler)", watt: 3 },
    { name: "NZXT Kraken X63 (AIO 280mm)", watt: 15 },
    { name: "Cooler Master Hyper 212 (Air Cooler)", watt: 5 },
    { name: "Arctic Liquid Freezer II 240", watt: 12 },
    { name: "Lian Li Galahad II 360", watt: 18 },
    { name: "Thermalright Phantom Spirit 120", watt: 4 },
    { name: "Be Quiet! Dark Rock Pro 4", watt: 3 },
    { name: "DeepCool AK620", watt: 5 },
    { name: "AMD Stock Cooler (Wraith Prism)", watt: 2 },
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

            <a href="/" className="btn btn-dark">
              Kembali
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
