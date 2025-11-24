"use client";

import { useEffect, useState } from "react";

export interface Build {
  id: string;
  name: string;
  cpu: string;
  gpu: string;
  ram: string;
  ssd: string;
  motherboard: string;
  casing: string;
  cooler: string;
  totalWatt: number;
  recommendedPSU: number;
}

export function usePCBuilder() {
  const [builds, setBuilds] = useState<Build[]>([]);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setBuilds(data));
  }, []);

  async function saveBuild(
    build: Omit<Build, "id" | "name"> & { name?: string },
  ) {
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...build,
        name: build.name || "My Build",
      }),
    });
    const newBuild = await response.json();
    setBuilds([...builds, newBuild]);
  }

  async function deleteBuild(id: string) {
    await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });
    setBuilds(builds.filter((b) => b.id !== id));
  }

  async function getBuild(id: string) {
    const response = await fetch(`/api/items/${id}`);
    return await response.json();
  }

  async function updateBuild(id: string, build: Partial<Build>) {
    const response = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(build),
    });
    const updatedBuild = await response.json();
    setBuilds(builds.map((b) => (b.id === id ? updatedBuild : b)));
  }

  return { builds, saveBuild, deleteBuild, getBuild, updateBuild };
}
